import { Repository, EntityRepository, Connection } from 'typeorm';

import { Information } from './information.entity';
import { Injectable } from '@nestjs/common';

const PAGE_SIZE = 5;

@Injectable()
@EntityRepository(Information)
export class InformationRepository extends Repository<Information> {

  async listInformations(page: number) {
    return this.find({ skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE });
  }

}

export const InformationRepositoryProvider = {
  provide: 'InformationRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(InformationRepository),
  inject: [Connection],
};
