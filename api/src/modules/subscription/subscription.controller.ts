import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { IsAuthenticated } from 'Common/auth.guard';

import { Paginated } from 'Common/paginated';
import { User as ReqUser } from 'Common/user.decorator';
import { User } from '../user/user.entity';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';
import { PaginatedOutput } from 'Common/output.interceptor';
import { SubscriptionOutDto } from './dtos/subscription-out.dto';
import { StripNullRelations } from './strip-null-relations.interceptor';
import { PopulateSubscription } from 'Common/populate-subscription.interceptor';
import { PageQuery } from 'Common/page-query.decorator';

@Controller('subscription')
@UseInterceptors(StripNullRelations)
export class SubscriptionController {

  constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateSubscription)
  @PaginatedOutput(SubscriptionOutDto)
  findForUser(
    @ReqUser() user: User,
    @PageQuery() page: number,
  ): Promise<Paginated<Subscription>> {
    return this.subscriptionService.findAllForUser(user, page);
  }

}