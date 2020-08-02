import { Injectable } from '@nestjs/common';

import { Factory } from '../../../testing/factory';
import { Comment } from '../../comment/comment.entity';
import { CommentFactory } from '../../comment/comment.factory';
import { User } from '../../user/user.entity';
import { UserFactory } from '../../user/user.factory';

import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

type SubscriptionFactoryData = {
  user?: User;
  comment?: Comment;
};

@Injectable()
export class SubscriptionFactory implements Factory<SubscriptionFactoryData, Subscription> {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly commentFactory: CommentFactory,
    private readonly userFactory: UserFactory,
  ) {}

  async create(data: SubscriptionFactoryData = {}) {
    const getUser = async () => {
      return data.user || await this.userFactory.create();
    };

    const getComment = async () => {
      return data.comment || await this.commentFactory.create();
    };

    return this.subscriptionService.subscribe(await getUser(), await getComment());
  }
}
