import { EntityRepository, Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { Information } from './information.entity';

@EntityRepository(Information)
export class InformationRepository extends Repository<Information> {

  async findAllPaginated(search: string | null, page: number, pageSize: number): Promise<Paginated<Information>> {
    const qb = this.createQueryBuilder()
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (search) {
      qb.where('url = :search', { search });
      qb.orWhere('identifier = :search', { search });
      qb.orWhere('title ILIKE :search', { search: `%${search}%` });
    }

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async getCommentsCounts(informationIds: number[]): Promise<{ [informationId: number]: number }> {
    const counts = await this.createQueryBuilder('information')
      .select('information.id', 'information_id')
      .addSelect('count(comment.id)', 'count')
      .leftJoin('comment', 'comment', 'comment.information_id = information.id')
      .where('information.id IN (' + informationIds + ')')
      .groupBy('information.id')
      .getRawMany();

    /* eslint-disable @typescript-eslint/camelcase */
    return counts.reduce((acc, { information_id, count }) => ({
      ...acc,
      [information_id]: Number(count),
    }), {});
    /* eslint-enable @typescript-eslint/camelcase */
  }

}
