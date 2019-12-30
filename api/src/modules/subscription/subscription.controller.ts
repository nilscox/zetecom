import { Controller, Get, UseGuards, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { IsAuthenticated } from 'Common/auth.guard';

import { Paginated } from 'Common/paginated';
import { User as ReqUser } from 'Common/user.decorator';
import { User } from '../user/user.entity';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';
import { OptionalQuery } from 'Common/optional-query.decorator';
import { PaginatedOutput } from 'Common/output.interceptor';
import { SubscriptionOutDto } from './dtos/subscription-out.dto';
import { StripNullRelations } from './strip-null-relations.interceptor';

@Controller('subscription')
@UseInterceptors(StripNullRelations)
export class SubscriptionController {

  constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get('me')
  @UseGuards(IsAuthenticated)
  @PaginatedOutput(SubscriptionOutDto)
  findForUser(
    @ReqUser() user: User,
    @OptionalQuery({ key: 'page', defaultValue: '1' }, new ParseIntPipe()) page: number,
  ): Promise<Paginated<Subscription>> {
    return this.subscriptionService.findAllForUser(user, page);
  }

}
