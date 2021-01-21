import { EntityRepository, Repository } from 'typeorm';

import { Paginated } from 'src/common/paginated';

import { CommentsArea } from './comments-area.entity';

@EntityRepository(CommentsArea)
export class CommentsAreaRepository extends Repository<CommentsArea> {

  async findAllPaginated(search: string | null, page: number, pageSize: number): Promise<Paginated<CommentsArea>> {
    const qb = this.createQueryBuilder()
      .orderBy('created', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (search) {
      qb.orWhere('identifier = :search', { search });
      qb.where('information_url = :search', { search });
      qb.orWhere('information_title ILIKE :search', { search: `%${search}%` });
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

    return counts.reduce((acc, { comments_area_id, count }) => ({
      ...acc,
      [comments_area_id]: Number(count),
    }), {});
  }

}
