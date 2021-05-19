import { getCustomRepository } from 'typeorm';

import { Factory } from 'src/testing/factory';

import { CommentsArea, CommentsAreaStatus } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';

export class CommentsAreaFactory implements Factory<CommentsArea> {
  private get repository() {
    return getCustomRepository(CommentsAreaRepository);
  }

  async create(override: Partial<Omit<CommentsArea, 'id'>> = {}) {
    const data = {
      status: CommentsAreaStatus.open,
      informationUrl: 'https://information.url',
      informationTitle: 'Fake News!',
      informationAuthor: 'anyone',
      informationPublicationDate: new Date().toISOString(),
      ...override,
    };

    return this.repository.save(data);
  }
}
