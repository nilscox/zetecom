import { getCustomRepository } from 'typeorm';

import { UserFactory } from 'src/modules/user/user.factory';
import { Factory } from 'src/testing/factory';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';

export class CommentsAreaFactory implements Factory<CommentsArea> {
  private userFactory = new UserFactory();

  private get repository() {
    return getCustomRepository(CommentsAreaRepository);
  }

  async create(override: Partial<Omit<CommentsArea, 'id'>> = {}) {
    const data = {
      informationUrl: 'https://information.url',
      informationTitle: 'Fake News!',
      informationAuthor: 'anyone',
      informationPublicationDate: new Date().toISOString(),
      ...override,
    };

    if (!data.creator) {
      data.creator = await this.userFactory.create();
    }

    return this.repository.save(data);
  }
}
