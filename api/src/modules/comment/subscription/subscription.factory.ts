import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { CommentFactory } from 'src/modules/comment/comment.factory';
import { UserFactory } from 'src/modules/user/user.factory';
import { Factory } from 'src/testing/factory';

import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionFactory implements Factory<Subscription> {
  private commentFactory = new CommentFactory();
  private userFactory = new UserFactory();

  private get repository() {
    return getRepository(Subscription);
  }

  async create(override: Partial<Omit<Subscription, 'id'>> = {}) {
    const data = { ...override };

    if (!data.user) {
      data.user = await this.userFactory.create();
    }

    if (!data.comment) {
      data.comment = await this.commentFactory.create();
    }

    return this.repository.save(data);
  }
}
