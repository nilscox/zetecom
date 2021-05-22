import { Brackets, EntityRepository, getRepository, In, Repository, SelectQueryBuilder } from 'typeorm';

import { Paginated } from 'src/common/paginated';
import { SortType } from 'src/common/sort-type';

import { Comment, CommentStatus } from './comment.entity';
import { Message } from './message.entity';
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

export type CommentJoinRelations = {
  author?: boolean;
  message?: boolean;
  messages?: boolean;
  commentsArea?: boolean;
  parent?: boolean;
};

type Pagination = {
  page: number;
  pageSize: number;
};

export type FindAllOptions = {
  ids?: number[];
  sort?: SortType;
  relations?: CommentJoinRelations;
  root?: boolean;
  search?: string;
  commentsAreaId?: number;
  authorId?: number;
  parentId?: number;
  pagination?: Pagination;
  includePending?: boolean;
};

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  private readonly reactionRepository: Repository<Reaction>;

  constructor() {
    super();

    // TODO: remove
    this.reactionRepository = getRepository(Reaction);
  }

  createQueryBuilder(alias: string) {
    return super.createQueryBuilder(alias).where(`${alias}.deleted IS NULL`);
  }

  async exists(id: number): Promise<boolean> {
    return (await this.count({ id })) === 1;
  }

  async findAll(opts: FindAllOptions = {}): Promise<Paginated<Comment>> {
    const qb = this.createQueryBuilder('comment');

    if (typeof opts.ids !== 'undefined') {
      qb.whereInIds(opts.ids);
    }

    if (typeof opts.sort !== 'undefined') {
      this.orderBy(qb, opts.sort);
    }

    if (typeof opts.search !== 'undefined') {
      this.search(qb, opts.search);
    }

    if (typeof opts.authorId !== 'undefined') {
      qb.andWhere('comment.author_id = :authorId', { authorId: opts.authorId });
    }

    if (typeof opts.commentsAreaId !== 'undefined') {
      qb.andWhere('comment.comments_area_id = :commentsAreaId', { commentsAreaId: opts.commentsAreaId });
    }

    if (typeof opts.root !== 'undefined') {
      qb.andWhere('comment.parent_id IS NULL');
    }

    if (typeof opts.parentId !== 'undefined') {
      qb.andWhere('comment.parent_id = :parentId', { parentId: opts.parentId });
    }

    if (!opts.includePending) {
      qb.andWhere('comment.status = :status', { status: CommentStatus.published });
    }

    if (typeof opts.pagination !== 'undefined') {
      this.paginate(qb, opts.pagination);
    }

    this.joinAndSelect(qb, opts?.relations);

    // console.log(qb.getSql());
    // console.log(qb.getParameters());

    const [items, total] = await qb.getManyAndCount();

    // console.log(items);

    return { items, total };
  }

  async findById(id: number, relations?: CommentJoinRelations) {
    const qb = this.createQueryBuilder('comment').where({ id });

    this.joinAndSelect(qb, relations);

    // console.log(qb.getSql());
    // console.log(qb.getParameters());

    return qb.getOne();
  }

  private joinAndSelect(qb: SelectQueryBuilder<Comment>, relations?: CommentJoinRelations) {
    // prettier-ignore
    const {
      author = true,
      message = true,
      messages = false,
      commentsArea = false,
      parent = false,
    } = { ...relations };

    if (author) {
      qb.leftJoinAndSelect('comment.author', 'author');
    }

    if (message) {
      qb.leftJoinAndSelect('comment.message', 'message');
    }

    if (messages) {
      qb.leftJoinAndSelect('comment.messages', 'messages').addOrderBy('messages.created', 'DESC');
    }

    if (commentsArea) {
      qb.leftJoinAndSelect('comment.commentsArea', 'commentsArea');
    }

    if (parent) {
      qb.leftJoinAndSelect('comment.parent', 'parent');
    }
  }

  private orderBy(qb: SelectQueryBuilder<Comment>, sort: SortType) {
    if (sort === SortType.DATE_ASC) {
      qb.addOrderBy('comment.created', 'ASC');
    } else if (sort === SortType.DATE_DESC) {
      qb.addOrderBy('comment.created', 'DESC');
    } else if (sort === SortType.RELEVANCE) {
      qb.addOrderBy('comment.score', 'DESC').addOrderBy('comment.created', 'DESC');
    }
  }

  private search(qb: SelectQueryBuilder<Comment>, search: string) {
    qb.andWhere('message.text ILIKE :search', { search: `%${search}%` });
  }

  private paginate(qb: SelectQueryBuilder<Comment>, { page, pageSize }: FindAllOptions['pagination']) {
    qb.limit(pageSize);
    qb.offset(pageSize * (page - 1));
  }

  async findForUser(userId: number, search: string | null, pagination: Pagination): Promise<Paginated<Comment>> {
    const getCommentsAreasIds = async () => {
      const qb = this.createQueryBuilder('comment')
        .select('comment.comments_area_id')
        .where('author_id = :userId', { userId })
        .groupBy('comment.comments_area_id')
        .addGroupBy('comment.created');

      this.orderBy(qb, SortType.DATE_DESC);

      if (search) {
        this.joinAndSelect(qb);
        this.search(qb, search);
      }

      const commentsAreaIds = await qb.getRawMany();

      return [...new Set(commentsAreaIds.map(({ comments_area_id }) => comments_area_id))];
    };

    const commentsAreasIds = await getCommentsAreasIds();
    const qb = this.createQueryBuilder('comment')
      .select('comment.id')
      .addSelect('comment.comments_area_id')
      .where(`comments_area_id IN (${commentsAreasIds.join(', ')})`)
      .andWhere('author_id = :userId', { userId })
      .orderBy(`idx(array[${commentsAreasIds.join(', ')}], comment.comments_area_id)`);

    if (search) {
      this.joinAndSelect(qb);
      this.search(qb, search);
    }

    this.paginate(qb, pagination);

    const comments = await qb.getMany();

    return this.findAll({
      ids: comments.map((comment) => comment.id),
      relations: { commentsArea: true },
    });
  }

  private async findAncestorsIds(id: number): Promise<number[]> {
    // prettier-ignore
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

  async findAncestors(id: number): Promise<Comment[]> {
    return super.findByIds(await this.findAncestorsIds(id));
  }

  async incrementScore(id: number, by = 1) {
    return this.increment({ id: In([id, ...(await this.findAncestorsIds(id))]) }, 'score', by);
  }

  async decrementScore(id: number, by = 1) {
    return this.decrement({ id: In([id, ...(await this.findAncestorsIds(id))]) }, 'score', by);
  }

  async getMessages(commentsIds: number[]): Promise<{ commentId: number; messages: Message[] }[]> {
    const comments = await this.createQueryBuilder('comment')
      .where('comment.id IN (' + commentsIds + ')')
      .leftJoinAndSelect('comment.messages', 'messages')
      .getMany();

    return comments.map(({ id, messages }) => ({
      commentId: id,
      messages,
    }));
  }

  async getRepliesCounts(commentsIds: number[]): Promise<RepliesCount[]> {
    const repliesCounts = await this.createQueryBuilder('comment')
      .select('comment.id')
      .addSelect('count(replies.id)', 'comment_repliesCount')
      .leftJoin('comment.replies', 'replies')
      .where('replies.parent_id IN (' + commentsIds + ')')
      .andWhere('replies.deleted IS NULL')
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
    const counts = await this.reactionRepository
      .createQueryBuilder('reaction')
      .select('comment_id')
      .addSelect('type')
      .addSelect('count(id)', 'count')
      .where('reaction.comment_id IN (' + commentsIds + ')')
      .groupBy('type')
      .addGroupBy('comment_id')
      .getRawMany();

    const defaultReactions = Object.values(ReactionType).reduce(
      (obj, type) => ({ ...obj, [type]: 0 }),
      {} as Record<ReactionType, number>,
    );

    const results = commentsIds.map((id) => ({ commentId: id, reactions: { ...defaultReactions } }));

    counts.forEach(({ comment_id: id, type, count }: { comment_id: number; type: ReactionType; count: number }) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = results.find(({ commentId }) => id === commentId)!;

      result.reactions[type] = Number(count);
    });

    return results;
  }

  async getReactionForUser(commentsIds: number[], userId: number): Promise<UserReaction[]> {
    const result = await this.reactionRepository
      .createQueryBuilder('reaction')
      .select('comment_id')
      .addSelect('type')
      .where('reaction.comment_id IN (' + commentsIds + ')')
      .andWhere('reaction.user_id = :userId', { userId })
      .groupBy('type')
      .addGroupBy('comment_id')
      .getRawMany();

    return result.map((qr) => ({
      commentId: qr.comment_id,
      type: qr.type as ReactionType | null,
    }));
  }
}
