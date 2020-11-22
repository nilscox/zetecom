import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { PopulateInterceptor } from '../../../common/populate.interceptor';
import { PopulateComment } from '../../comment/populate-comment.interceptor';

import { SubscriptionDto } from './dtos/subscrption.dto';

@Injectable()
export class PopulateSubscription extends PopulateInterceptor<SubscriptionDto> {

  constructor(
    private readonly populateComment: PopulateComment,
  ) {
    super();
  }

  async populate(subscriptions: SubscriptionDto[], request: Request) {
    await this.populateComment.transform(subscriptions.map(s => s.comment), request);
  }

}
