import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { UserFactory } from 'src/modules/user/user.factory';
import { Factory } from 'src/testing/factory';

import { CommentsAreaRequest, CommentsAreaRequestStatus } from './comments-area-request.entity';

@Injectable()
export class CommentsAreaRequestFactory implements Factory<CommentsAreaRequest> {
  private userFactory = new UserFactory();

  private get repository() {
    return getRepository(CommentsAreaRequest);
  }

  async create(override: Partial<Omit<CommentsAreaRequest, 'id'>> = {}) {
    const data = {
      status: CommentsAreaRequestStatus.PENDING,
      ...override,
    };

    if (!data.requester) {
      data.requester = await this.userFactory.create();
    }

    return this.repository.save(data);
  }
}
