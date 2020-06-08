import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthUser } from 'Common/auth-user.decorator';
import { IsAuthenticated } from 'Common/auth.guard';
import { PaginatedOutput } from 'Common/output.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';

import { ReactionSubscriptionOutDto } from './dtos/subscription-out.dto';
import { PopulateSubscription } from './populate-subscription.interceptor';
import { StripNullRelations } from './strip-null-relations.interceptor';
import { ReactionSubscription } from './subscription.entity';
import { ReactionSubscriptionService } from './subscription.service';

@Controller('subscription')
@UseInterceptors(StripNullRelations)
export class ReactionSubscriptionController {

  constructor(
    private readonly subscriptionService: ReactionSubscriptionService,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateSubscription)
  @PaginatedOutput(ReactionSubscriptionOutDto)
  findForUser(
    @AuthUser() user: User,
    @PageQuery() page: number,
  ): Promise<Paginated<ReactionSubscription>> {
    return this.subscriptionService.findAllForUser(user, page);
  }

}
