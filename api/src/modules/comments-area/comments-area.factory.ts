import { getCustomRepository } from 'typeorm';

import { Factory } from '../../testing/factory';
import { UserFactory } from '../user/user.factory';

import { CommentsArea } from './comments-area.entity';
import { CommentsAreaRepository } from './comments-area.repository';

export class CommentsAreaFactory implements Factory<CommentsArea> {
  private userFactory = new UserFactory();

  private get repository() {
    return getCustomRepository(CommentsAreaRepository);
  }

  async create(override: Partial<Omit<CommentsArea, 'id'>> = {}) {
    const data = {
      identifier: `id:${Math.random().toString(36).slice(6)}`,
      informationUrl: 'https://information.url',
      informationTitle: 'Fake News!',
      informationAuthor: 'anyone',
      published: new Date().toISOString(),
      ...override,
    };

    if (!data.creator) {
      data.creator = await this.userFactory.create();
    }

    return this.repository.save(data);
  }
}
