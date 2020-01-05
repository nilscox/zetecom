import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { IsAuthenticated } from 'Common/auth.guard';

import { Paginated } from 'Common/paginated';
import { AuthUser } from 'Common/auth-user.decorator';
import { User } from '../user/user.entity';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';
import { PaginatedOutput } from 'Common/output.interceptor';
import { SubscriptionOutDto } from './dtos/subscription-out.dto';
import { StripNullRelations } from './strip-null-relations.interceptor';
import { PopulateSubscription } from 'Common/populate-subscription.interceptor';
import { PageQuery } from 'Common/page-query.decorator';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { OptionalParseIntPipe } from 'Common/optional-parse-int.pipe';

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
    @AuthUser() user: User,
    @OptionalQuery({ key: 'informationId' }, new OptionalParseIntPipe()) informationId: number | undefined,
    @PageQuery() page: number,
  ): Promise<Paginated<Subscription>> {
    return this.subscriptionService.findAllForUser(user, informationId, page);
  }

}
