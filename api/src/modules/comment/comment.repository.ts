/* eslint-disable @typescript-eslint/camelcase */

import { EntityRepository, getConnection, getRepository, In, Repository, SelectQueryBuilder } from 'typeorm';

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

    qb.addOrderBy('messages.created', 'DESC');
  }

  async exists(id: number): Promise<boolean> {
    return (await this.count({ id })) === 1;
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
    search: string,
    page: number,
    pageSize: number,
  ): Promise<Paginated<{ commentId: number; informationId: number }>> {

    // select distinct information_id from (
    //   select information_id from comment
    //   where author_id = 1
    //   group by information_id, created
    //   order by created desc
    // ) information_id;

    const getInformationIds = async () => {
      const qb = getConnection().createQueryBuilder()
        .select('information_id')
        .distinct(true)
        .from(subQuery => {
          subQuery.select('comment.information_id')
            .from('comment', 'comment')
            .where('comment.author_id = :userId', { userId })
            .groupBy('comment.information_id, comment.created')
            .orderBy('comment.created', 'DESC');

          if (search) {
            subQuery
              .leftJoin('comment.messages', 'messages')
              .andWhere('messages.text ILIKE :search', { search: `%${search}%` });
          }

          return subQuery;
        }, 'information_id');

      const result = await qb.getRawMany();

      return result.map(({ information_id }: { information_id: number }) => information_id);
    };

    // select i.id iid, c.id cid, c.created from information i
    // join comment c on c.information_id = i.id
    // where r.author_id = 1
    // order idx(array[XX, YY], i.id), c.created desc;

    const getCommentsIds = async (informationIds: number[]) => {
      const qb = this.createQueryBuilder('comment')
        .select('comment.id')
        .addSelect('comment.information_id')
        .leftJoin('comment.information', 'information')
        .where('comment.author_id = :userId', { userId })
        .orderBy(`idx(array[${informationIds.join(', ')}], information.id)`)
        .addOrderBy('comment.created', 'DESC')
        .offset((page - 1) * pageSize)
        .limit(pageSize);

      if (search) {
        qb
          .leftJoin('comment.messages', 'messages')
          .andWhere('message.text ILIKE :search', { search: `%${search}%` });
      }

      const results = await qb.getRawMany();

      return {
        items: results.map(({ comment_id, information_id }) => ({ commentId: comment_id, informationId: information_id })),
        total: await qb.getCount(),
      };
    };

    const informationIds = await getInformationIds();

    if (informationIds.length === 0)
      return { items: [], total: 0 };

    return getCommentsIds(informationIds);
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
