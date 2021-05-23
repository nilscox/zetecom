import { getRepository } from 'typeorm';

import { Factory } from 'src/testing/factory';

import { CommentsAreaInformation } from './comments-area-information.entity';

export class CommentsAreaInformationFactory implements Factory<CommentsAreaInformation> {
  private get repository() {
    return getRepository(CommentsAreaInformation);
  }

  async create(override: Partial<Omit<CommentsAreaInformation, 'id'>> = {}) {
    const data = {
      ...override,
    };

    return this.repository.save(data);
  }
}
