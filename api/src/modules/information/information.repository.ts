import { Repository, EntityRepository } from 'typeorm';

import { Information } from './information.entity';

@EntityRepository(Information)
export class InformationRepository extends Repository<Information> {

  async findAll(page: number, pageSize: number) {
    return this.find({ skip: (page - 1) * pageSize, take: pageSize });
  }

}
