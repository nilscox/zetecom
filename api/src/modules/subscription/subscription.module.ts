import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationModule } from '../notification/notification.module';

import { ReactionSubscriptionController } from './subscription.controller';
import { ReactionSubscription } from './subscription.entity';
import { ReactionSubscriptionService } from './subscription.service';

const REACTION_SUBSCRIPTION_PAGE_SIZE = 'REACTION_SUBSCRIPTION_PAGE_SIZE';
const ReactionSubscriptionPageSize: Provider = {
  provide: REACTION_SUBSCRIPTION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([ReactionSubscription]),
    NotificationModule,
  ],
  controllers: [ReactionSubscriptionController],
  providers: [ReactionSubscriptionPageSize, ReactionSubscriptionService],
  exports: [ReactionSubscriptionService],
})
export class ReactionSubscriptionModule {}
