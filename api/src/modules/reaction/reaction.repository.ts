import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityRepository, Connection, getCustomRepository, getRepository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { Reaction } from './reaction.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';

const PAGE_SIZE = 5;

type RepliesCount = {
  reactionId: number;
  repliesCount: number;
};

type QuickReactionsCount = {
  reactionId: number;
  quickReactions: {
    [key in QuickReactionType]: number;
  };
};

type UserQuickReaction = {
  reactionId: number,
  type: QuickReactionType | null;
};

@EntityRepository(Reaction)
export class ReactionRepository extends Repository<Reaction> {

  private readonly quickReactionRepository: Repository<QuickReaction>;

  constructor() {
    super();

    this.quickReactionRepository = getRepository(QuickReaction);
  }

  private sortByRelevance(reactions: Reaction[]) {
    const sumQuickReacitonsCount = ({ quickReactionsCount: r }: Reaction) => {
      return r.APPROVE + r.REFUTE + r.SKEPTIC;
    };

    const scores = reactions
      .map(r => r.repliesCount + sumQuickReacitonsCount(r))
      .reduce((acc, score, idx) => ({ ...acc, [reactions[idx].id]: score }), {});

    reactions.sort((a, b) => scores[b.id] - scores[a.id]);
  }

  async listStandaloneRootReactions(informationId: number, sort: SortType, page = 1): Promise<Reaction[]> {
    const reactions = await this.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author')
      .leftJoinAndSelect('reaction.messages', 'message')
      .where('reaction.information_id = :informationId', { informationId })
      .andWhere('reaction.subject_id IS NULL')
      .andWhere('reaction.parent_id IS NULL')
      .orderBy('reaction.created', sort === SortType.DATE_DESC ? 'DESC' : 'ASC')
      .addOrderBy('message.created', 'ASC')
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getMany();

    if (sort === SortType.RELEVANCE)
      this.sortByRelevance(reactions);

    return reactions;
  }

  async searchStandaloneReactions(informationId: number, search: string, sort: SortType, page = 1): Promise<Reaction[]> {
    const reactions = await this.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author')
      .leftJoinAndSelect('reaction.messages', 'message')
      .where('reaction.information_id = :informationId', { informationId })
      .andWhere('reaction.subject_id IS NULL')
      .andWhere('message.text ILIKE :search', { search: `%${search}%` })
      .orderBy('reaction.created', sort === SortType.DATE_DESC ? 'DESC' : 'ASC')
      .addOrderBy('message.created', 'ASC')
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getMany();

    if (sort === SortType.RELEVANCE)
      this.sortByRelevance(reactions);

    return reactions;
  }

  async listRootReactions(subjectId: number, sort: SortType, page = 1) {
    const reactions = await this.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author')
      .leftJoinAndSelect('reaction.messages', 'message')
      .where('reaction.subject_id = :subjectId', { subjectId })
      .andWhere('reaction.parent_id IS NULL')
      .orderBy('reaction.created', sort === SortType.DATE_DESC ? 'DESC' : 'ASC')
      .addOrderBy('message.created', 'ASC')
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getMany();

    if (sort === SortType.RELEVANCE)
      this.sortByRelevance(reactions);

    return reactions;
  }

  async findReplies(parentId: number): Promise<Reaction[]> {
    return this.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author', 'reaction.author_id = author.id')
      .leftJoinAndSelect('reaction.messages', 'message', 'message.reaction_id = reaction.id')
      .where('reaction.parent_id = :parentId', { parentId })
      .orderBy('reaction.created')
      .addOrderBy('message.created', 'ASC')
      .getMany();
  }

  async findRepliesCount(reactionIds: number[]): Promise<RepliesCount[]> {
    // TODO: map
    const result = await this.createQueryBuilder('reaction')
      .select('reaction.id')
      .addSelect('count(replies.id)', 'reaction_repliesCount')
      .leftJoin('reaction.replies', 'replies')
      .where('replies.parent_id IN (' + reactionIds + ')')
      .groupBy('reaction.id')
      .getRawMany();

    return result.map(r => ({
      reactionId: r.reaction_id,
      repliesCount: parseInt(r.reaction_repliesCount, 10),
    }));
  }

  async getQuickReactionsCounts(reactionIds): Promise<QuickReactionsCount[]> {
    const counts = await this.quickReactionRepository.createQueryBuilder('quick_reaction')
      .select('reaction_id')
      .addSelect('type')
      .addSelect('count(id)', 'count')
      .where('quick_reaction.reaction_id IN (' + reactionIds + ')')
      .groupBy('type')
      .addGroupBy('reaction_id')
      .getRawMany();

    const defaultQuickReactions = {
      [QuickReactionType.APPROVE]: 0,
      [QuickReactionType.REFUTE]: 0,
      [QuickReactionType.SKEPTIC]: 0,
    };

    const results = reactionIds.map((id) => ({ reactionId: id, quickReactions: { ...defaultQuickReactions } }));

    counts.forEach(({ reaction_id: id, type, count }) => {
      const result = results.find(({ reactionId }) => id === reactionId);

      result.quickReactions[type] = Number(count);
    });

    return results;
  }

  async getQuickReactionForUser(reactionIds: number[], userId: number): Promise<UserQuickReaction[]> {
    const result = await this.quickReactionRepository.createQueryBuilder('quick_reaction')
      .select('reaction_id')
      .addSelect('type')
      .where('quick_reaction.reaction_id IN (' + reactionIds + ')')
      .andWhere('quick_reaction.user_id = :userId', { userId })
      .groupBy('type')
      .addGroupBy('reaction_id')
      .getRawMany();

    return result.map(r => ({
      reactionId: r.reaction_id,
      type: r.type as QuickReactionType | null,
    }));
  }

}
