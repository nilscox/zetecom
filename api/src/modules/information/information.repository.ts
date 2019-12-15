import { Repository, EntityRepository } from 'typeorm';

import { Information } from './information.entity';
import { Paginated } from 'Common/paginated';

@EntityRepository(Information)
export class InformationRepository extends Repository<Information> {

  async findAllPaginated(page: number, pageSize: number): Promise<Paginated<Information>> {
    const [items, total] = await this.findAndCount({ skip: (page - 1) * pageSize, take: pageSize });

    return { items, total };
  }

}
