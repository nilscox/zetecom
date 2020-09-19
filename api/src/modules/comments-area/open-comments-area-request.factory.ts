import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { UserFactory } from '../user/user.factory';

import { CommentsAreaService } from './comments-area.service';
import { OpenCommentsAreaRequest } from './open-comments-area-request.entity';

type OpenCommentsAreaRequestFactoryData = {
  identifier?: string;
};

@Injectable()
export class OpenCommentsAreaRequestFactory implements Factory<OpenCommentsAreaRequestFactoryData, OpenCommentsAreaRequest> {
  constructor(
    private readonly commentsAreaService: CommentsAreaService,
    private readonly userFactory: UserFactory,
  ) {}

  async create(data: OpenCommentsAreaRequestFactoryData = {}) {
    const getRequester = async () => {
      return this.userFactory.create();
    };

    return this.commentsAreaService.request(
      {
        identifier: `id:${Math.random().toString(36).slice(6)}`,
        ...data,
      },
      await getRequester(),
    );
  }
}
