import { EntityRepository, Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { Information } from './information.entity';

@EntityRepository(Information)
export class InformationRepository extends Repository<Information> {

  async findAllPaginated(page: number, pageSize: number): Promise<Paginated<Information>> {
    const [items, total] = await this.findAndCount({ skip: (page - 1) * pageSize, take: pageSize });

    return { items, total };
  }

  async getReactionsCounts(informationIds: number[]): Promise<{ [informationId: number]: number }> {
    const counts = await this.createQueryBuilder('information')
      .select('information.id', 'information_id')
      .addSelect('count(reaction.id)', 'count')
      .leftJoin('reaction', 'reaction', 'reaction.information_id = information.id')
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
