import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { IsAuthenticated } from 'src/common/auth.guard';
import { AuthUser } from 'src/common/auth-user.decorator';
import { ClassToPlainInterceptor } from 'src/common/ClassToPlain.interceptor';
import { PageQuery } from 'src/common/page-query.decorator';
import { PageSizeQuery } from 'src/common/page-size-query.decorator';
import { Paginated } from 'src/common/paginated';
import { User } from 'src/modules/user/user.entity';

import { PopulateSubscription } from './populate-subscription.interceptor';
import { StripNullRelations } from './strip-null-relations.interceptor';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
@UseInterceptors(ClassToPlainInterceptor)
@UseInterceptors(StripNullRelations)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @UseInterceptors(PopulateSubscription)
  findForUser(
    @AuthUser() user: User,
    @PageQuery() page: number,
    @PageSizeQuery() pageSize: number,
  ): Promise<Paginated<Subscription>> {
    return this.subscriptionService.findAllForUser(user, page, pageSize);
  }
}
