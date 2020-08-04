/* eslint-disable @typescript-eslint/camelcase */

import { EntityRepository, getRepository, In, Repository, SelectQueryBuilder } from 'typeorm';

import { Paginated } from 'Common/paginated';
import { SortType } from 'Common/sort-type';

import { Comment } from './comment.entity';
import { Reaction, ReactionType } from './reaction.entity';

type RepliesCount = {
  commentId: number;
  repliesCount: number;
};

type ReactionsCount = {
  commentId: number;
  reactions: {
    [key in ReactionType]: number;
  };
};

type UserReaction = {
  commentId: number;
  type: ReactionType | null;
};

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

  private readonly reactionRepository: Repository<Reaction>;

  constructor() {
    super();

    // TODO: remove
    this.reactionRepository = getRepository(Reaction);
  }

  public findAll(ids: number[], { author = true, message = true } = {}) {
    const qb = this.createQueryBuilder('comment')
      .where(`comment.id IN (${ids.join(', ')})`);

    if (author)
      qb.leftJoinAndSelect('comment.author', 'author');

    if (message)
      qb.leftJoinAndSelect('comment.messages', 'messages');

    return qb.getMany();
  }

  private createDefaultQueryBuilder(page: number, pageSize: number) {
    // take does not work well with orderBy
    // https://github.com/typeorm/typeorm/issues/747#issuecomment-349108902
    return this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.messages', 'messages')
      .orderBy('messages.created', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);
  }

  private orderBy(qb: SelectQueryBuilder<Comment>, sort: SortType) {
    if (sort === SortType.DATE_ASC)
      qb.orderBy('comment.created', 'ASC');
    else if (sort === SortType.DATE_DESC)
      qb.orderBy('comment.created', 'DESC');
    else if (sort === SortType.RELEVANCE) {
      qb.addOrderBy('comment.score', 'DESC')
        .addOrderBy('comment.created', 'DESC');
    }

    // need?
    // qb.addOrderBy('messages.created', 'DESC');
  }

  async exists(id: number): Promise<boolean> {
    return (await this.count({ id })) === 1;
  }

  async findById(id: number, opts = { author: true, information: false, parent: false }) {
    const qb = this.createQueryBuilder('comment')
      .where({ id })
      .leftJoinAndSelect('comment.messages', 'messages')
      .orderBy('messages.created', 'DESC');

    if (opts.author)
      qb.leftJoinAndSelect('comment.author', 'author');

    if (opts.information)
      qb.leftJoinAndSelect('comment.information', 'information');

    if (opts.parent)
      qb.leftJoinAndSelect('comment.parent', 'parent');

    return qb.getOne();
  }

  async findRootComments(
    informationId: number,
    sort: SortType,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Comment>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .where('comment.information_id = :informationId', { informationId })
      .andWhere('comment.parent_id IS NULL');

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
  ): Promise<Paginated<Comment>> {
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .where('comment.information_id = :informationId', { informationId })
      .andWhere('messages.text ILIKE :search', { search: `%${search}%` });

    this.orderBy(qb, sort);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async findReplies(parentId: number, page: number, pageSize: number): Promise<Paginated<Comment>> {
    const [items, total] = await this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author', 'comment.author_id = author.id')
      .leftJoinAndSelect('comment.messages', 'messages', 'messages.comment_id = comment.id')
      .where('comment.parent_id = :parentId', { parentId })
      .orderBy('comment.created')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { items, total };
  }

  async findForUser(
    userId: number,
    search: string | null,
    page: number,
    pageSize: number,
  ): Promise<Paginated<Comment>> {
    const getInformationsIds = async () => {
      const qb = this.createQueryBuilder('comment')
        .select('comment.information_id')
        .where('author_id = :userId', { userId })
        .leftJoin('comment.messages', 'messages')
        .groupBy('comment.information_id')
        .addGroupBy('comment.created')
        .addGroupBy('messages.created')
        .orderBy('messages.created', 'DESC');

      if (search)
        qb.andWhere('message.text ILIKE :search', { search: `%${search}%` });

      return [...new Set((await qb.getRawMany()).map(({ information_id }) => information_id))];
    };

    const informationsIds = await getInformationsIds();
    const qb = this.createDefaultQueryBuilder(page, pageSize)
      .leftJoinAndSelect('comment.information', 'information')
      .where(`information_id IN (${informationsIds.join(', ')})`);

    if (search)
      qb.andWhere('message.text ILIKE :search', { search: `%${search}%` });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  private async findAncestors(id: number) {
    const [{ ancestors }] = await this.query(`
      WITH RECURSIVE tree AS (
        SELECT id, ARRAY[]::INTEGER[] AS ancestors
        FROM comment WHERE parent_id IS NULL
        UNION ALL
        SELECT comment.id, tree.ancestors || comment.parent_id
        FROM comment, tree
        WHERE comment.parent_id = tree.id
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

  async getRepliesCounts(commentsIds: number[]): Promise<RepliesCount[]> {
    const repliesCounts = await this.createQueryBuilder('comment')
      .select('comment.id')
      .addSelect('count(replies.id)', 'comment_repliesCount')
      .leftJoin('comment.replies', 'replies')
      .where('replies.parent_id IN (' + commentsIds + ')')
      .groupBy('comment.id')
      .getRawMany();

    const results = commentsIds.map((id) => ({ commentId: id, repliesCount: 0 }));

    repliesCounts.forEach(({ comment_id: id, comment_repliesCount }) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = results.find(({ commentId }) => commentId === id)!;

      result.repliesCount = Number(comment_repliesCount);
    });

    return results;
  }

  async getReactionsCounts(commentsIds: number[]): Promise<ReactionsCount[]> {
    const counts = await this.reactionRepository.createQueryBuilder('reaction')
      .select('comment_id')
      .addSelect('type')
      .addSelect('count(id)', 'count')
      .where('reaction.comment_id IN (' + commentsIds + ')')
      .groupBy('type')
      .addGroupBy('comment_id')
      .getRawMany();

    const defaultReactions = {
      [ReactionType.APPROVE]: 0,
      [ReactionType.REFUTE]: 0,
      [ReactionType.SKEPTIC]: 0,
    };

    const results = commentsIds.map((id) => ({ commentId: id, reactions: { ...defaultReactions } }));

    counts.forEach(({ comment_id: id, type, count }: { comment_id: number; type: ReactionType; count: number }) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = results.find(({ commentId }) => id === commentId)!;

      result.reactions[type] = Number(count);
    });

    return results;
  }

  async getReactionForUser(commentsIds: number[], userId: number): Promise<UserReaction[]> {
    const result = await this.reactionRepository.createQueryBuilder('reaction')
      .select('comment_id')
      .addSelect('type')
      .where('reaction.comment_id IN (' + commentsIds + ')')
      .andWhere('reaction.user_id = :userId', { userId })
      .groupBy('type')
      .addGroupBy('comment_id')
      .getRawMany();

    return result.map(qr => ({
      commentId: qr.comment_id,
      type: qr.type as ReactionType | null,
    }));
  }

}
