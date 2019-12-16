import { Repository, EntityRepository, getRepository, SelectQueryBuilder } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { Reaction } from './reaction.entity';
import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { Paginated } from 'Common/paginated';

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

  private async sortByRelevance(reactions: Reaction[]) {
    const repliesCounts = await this.getRepliesCounts(reactions.map(r => r.id));
    const quickReactionsCounts = await this.getQuickReactionsCounts(reactions.map(r => r.id));

    reactions.forEach(r => {
      r.repliesCount = repliesCounts.find(({ reactionId }) => reactionId === r.id).repliesCount;
      r.quickReactionsCount = quickReactionsCounts.find(({ reactionId }) => reactionId === r.id).quickReactions;
    });

    const sumQuickReacitonsCount = ({ quickReactionsCount: r }: Reaction) => {
      return r.APPROVE + r.REFUTE + r.SKEPTIC;
    };

    const scores = reactions
      .map(r => r.repliesCount + sumQuickReacitonsCount(r))
      .reduce((acc, score, idx) => ({ ...acc, [reactions[idx].id]: score }), {});

    reactions.sort((a, b) => scores[b.id] - scores[a.id]);
  }

  private createDefaultQueryBuilder(page: number, pageSize: number) {
    return this.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author')
      .leftJoinAndSelect('reaction.messages', 'message')
      .skip((page - 1) * pageSize)
      .take(pageSize);
  }

  private orderBy(qb: SelectQueryBuilder<Reaction>, sort: SortType) {
    if (sort === SortType.DATE_ASC)
      qb.orderBy('reaction.created', 'ASC');
    else if (sort === SortType.DATE_DESC)
      qb.orderBy('reaction.created', 'DESC');
    else if (sort === SortType.RELEVANCE) {
      // TODO
      /*
      with qrcount as (select r.id rid, count(qr.id) cnt from reaction r join quick_reaction qr on qr.reaction_id = r.id group by r.id),
      repcount as (select r.id rid, count(c.id) cnt from reaction r join reaction c on c.parent_id = r.id where r.subject_id is null group by r.id)
      select qrcount.rid, coalesce(qrcount.cnt, 0) + coalesce(repcount.cnt, 0) from qrcount full join repcount on qrcount.rid = repcount.rid;
      */
    }

    qb.addOrderBy('message.created', 'ASC');
  }

  async findRootReactions(
    informationId: number,
    sort: SortType,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Reaction>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .where('reaction.information_id = :informationId', { informationId })
      .andWhere('reaction.subject_id IS NULL')
      .andWhere('reaction.parent_id IS NULL');

    this.orderBy(qb, sort);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async search(
    informationId: number,
    search: string,
    sort: SortType,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Reaction>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .where('reaction.information_id = :informationId', { informationId })
      .andWhere('reaction.subject_id IS NULL')
      .andWhere('message.text ILIKE :search', { search: `%${search}%` });

    this.orderBy(qb, sort);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async findRootReactionsForSubject(
    subjectId: number,
    sort: SortType,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Reaction>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .where('reaction.subject_id = :subjectId', { subjectId })
      .andWhere('reaction.parent_id IS NULL');

    this.orderBy(qb, sort);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async searchInSubject(
    subjectId: number,
    search: string,
    sort: SortType,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Reaction>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .where('reaction.subject_id = :subjectId', { subjectId })
      .andWhere('message.text ILIKE :search', { search: `%${search}%` });

    this.orderBy(qb, sort);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async findReplies(parentId: number, page: number, pageSize: number): Promise<Paginated<Reaction>> {
    const [items, total] = await this.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.author', 'author', 'reaction.author_id = author.id')
      .leftJoinAndSelect('reaction.messages', 'message', 'message.reaction_id = reaction.id')
      .where('reaction.parent_id = :parentId', { parentId })
      .orderBy('reaction.created')
      .addOrderBy('message.created', 'ASC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { items, total };
  }

  async findForUser(
    userId: number,
    sort: SortType,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Reaction>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .where('reaction.author_id = :userId', { userId });

    this.orderBy(qb, sort);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async getRepliesCounts(reactionIds: number[]): Promise<RepliesCount[]> {
    const repliesCounts = await this.createQueryBuilder('reaction')
      .select('reaction.id')
      .addSelect('count(replies.id)', 'reaction_repliesCount')
      .leftJoin('reaction.replies', 'replies')
      .where('replies.parent_id IN (' + reactionIds + ')')
      .groupBy('reaction.id')
      .getRawMany();

    const results = reactionIds.map((id) => ({ reactionId: id, repliesCount: 0 }));

    repliesCounts.forEach(({ reaction_id: id, reaction_repliesCount }) => {
      const result = results.find(({ reactionId }) => reactionId === id);

      result.repliesCount = Number(reaction_repliesCount);
    });

    return results;
  }

  async getQuickReactionsCounts(reactionIds: number[]): Promise<QuickReactionsCount[]> {
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
