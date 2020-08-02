import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { Comment } from '../comment/comment.entity';
import { CommentFactory } from '../comment/comment.factory';
import { User } from '../user/user.entity';
import { UserFactory } from '../user/user.factory';

import { CommentSubscription } from './subscription.entity';
import { CommentSubscriptionService } from './subscription.service';

type CommentSubscriptionFactoryData = {
  user?: User;
  comment?: Comment;
};

@Injectable()
export class CommentSubscriptionFactory implements Factory<CommentSubscriptionFactoryData, CommentSubscription> {
  constructor(
    private readonly commentSubscriptionService: CommentSubscriptionService,
    private readonly commentFactory: CommentFactory,
    private readonly userFactory: UserFactory,
  ) {}

  async create(data: CommentSubscriptionFactoryData = {}) {
    const getUser = async () => {
      return data.user || await this.userFactory.create();
    };

    const getComment = async () => {
      return data.comment || await this.commentFactory.create();
    };

    return this.commentSubscriptionService.subscribe(await getUser(), await getComment());
  }
}
