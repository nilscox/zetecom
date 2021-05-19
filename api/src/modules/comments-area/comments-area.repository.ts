import { EntityRepository, Repository } from 'typeorm';

import { Paginated } from 'src/common/paginated';

import { CommentsArea, CommentsAreaStatus } from './comments-area.entity';

@EntityRepository(CommentsArea)
export class CommentsAreaRepository extends Repository<CommentsArea> {
  async findAllPaginated(search: string | null, page: number, pageSize: number): Promise<Paginated<CommentsArea>> {
    const qb = this.createQueryBuilder('commentsArea')
      .orderBy('created', 'DESC')
      .where('commentsArea.status = :status', { status: CommentsAreaStatus.open })
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (search) {
      //
    }

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async getCommentsCounts(commentsAreaIds: number[]): Promise<{ [commentsAreaId: number]: number }> {
    const counts = await this.createQueryBuilder('comments_area')
      .select('comments_area.id', 'comments_area_id')
      .addSelect('count(comment.id)', 'count')
      .leftJoin('comment', 'comment', 'comment.comments_area_id = comments_area.id')
      .where('comments_area.id IN (' + commentsAreaIds + ')')
      .groupBy('comments_area.id')
      .getRawMany();

    return counts.reduce(
      (acc, { comments_area_id, count }) => ({
        ...acc,
        [comments_area_id]: Number(count),
      }),
      {},
    );
  }
}
