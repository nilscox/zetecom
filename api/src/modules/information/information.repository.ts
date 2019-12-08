import { Repository, EntityRepository } from 'typeorm';

import { Information } from './information.entity';

const PAGE_SIZE = 5;

@EntityRepository(Information)
export class InformationRepository extends Repository<Information> {

  async listInformations(page: number) {
    return this.find({ skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE });
  }

}
