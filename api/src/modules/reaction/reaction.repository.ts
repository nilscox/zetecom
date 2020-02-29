import { EntityRepository, getRepository, In, Repository, SelectQueryBuilder } from 'typeorm';

import { Paginated } from 'Common/paginated';
import { SortType } from 'Common/sort-type';

import { QuickReaction, QuickReactionType } from './quick-reaction.entity';
import { Reaction } from './reaction.entity';

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
  reactionId: number;
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
      qb.addOrderBy('reaction.score', 'DESC')
        .addOrderBy('reaction.created', 'DESC');
    }

    qb.addOrderBy('message.created', 'ASC');
  }

  async exists(id: number): Promise<boolean> {
    return (await this.count({ id })) === 1;
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
    informationId: number | undefined,
    search: string,
    sort: SortType,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Reaction>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .leftJoinAndSelect('reaction.information', 'information')
      .where('reaction.author_id = :userId', { userId });

    if (informationId)
      qb.andWhere('information.id = :informationId', { informationId });

    if (search)
      qb.andWhere('message.text ILIKE :search', { search: `%${search}%` });

    this.orderBy(qb, sort);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  private async findAncestors(id: number) {
    const [{ ancestors }] = await this.query(`
      WITH RECURSIVE tree AS (
        SELECT id, ARRAY[]::INTEGER[] AS ancestors
        FROM reaction WHERE parent_id IS NULL
        UNION ALL
        SELECT reaction.id, tree.ancestors || reaction.parent_id
        FROM reaction, tree
        WHERE reaction.parent_id = tree.id
      ) SELECT ancestors FROM tree WHERE id = $1
    `.replace(/\n */g, ' '), [id]);

    return ancestors;
  }

  async incrementScore(id: number, by = 1) {
    return this.increment({ id: In([id, ...await this.findAncestors(id)]) }, 'score', by);
  }

  async decrementScore(id: number, by = 1) {
    return this.decrement({ id: In([id, ...await this.findAncestors(id)]) }, 'score', by);
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

    // eslint-disable-next-line @typescript-eslint/camelcase
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
