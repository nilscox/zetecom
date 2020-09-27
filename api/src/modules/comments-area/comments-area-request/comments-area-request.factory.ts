import { Injectable } from '@nestjs/common';

import { Factory } from '../../../testing/factory';
import { UserFactory } from '../../user/user.factory';

import { CommentsAreaRequest } from './comments-area-request.entity';
import { CommentsAreaRequestService } from './comments-area-request.service';

type CommentsAreaRequestFactoryData = {
  identifier?: string;
};

@Injectable()
export class CommentsAreaRequestFactory implements Factory<CommentsAreaRequestFactoryData, CommentsAreaRequest> {
  constructor(
    private readonly commentsAreaRequestService: CommentsAreaRequestService,
    private readonly userFactory: UserFactory,
  ) {}

  async create(data: CommentsAreaRequestFactoryData = {}) {
    const getRequester = async () => {
      return this.userFactory.create();
    };

    return this.commentsAreaRequestService.request(
      {
        identifier: `id:${Math.random().toString(36).slice(6)}`,
        ...data,
      },
      await getRequester(),
    );
  }
}
