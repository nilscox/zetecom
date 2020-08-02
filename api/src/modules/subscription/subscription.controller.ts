import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { ClassToPlainInterceptor } from 'Common/ClassToPlain.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';

import { PopulateSubscription } from './populate-subscription.interceptor';
import { StripNullRelations } from './strip-null-relations.interceptor';
import { CommentSubscription } from './subscription.entity';
import { CommentSubscriptionService } from './subscription.service';

@Controller('subscription')
@UseInterceptors(ClassToPlainInterceptor)
@UseInterceptors(StripNullRelations)
export class CommentSubscriptionController {

  constructor(
    private readonly subscriptionService: CommentSubscriptionService,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateSubscription)
  findForUser(
    @AuthUser() user: User,
    @PageQuery() page: number,
  ): Promise<Paginated<CommentSubscription>> {
    return this.subscriptionService.findAllForUser(user, page);
  }

}
