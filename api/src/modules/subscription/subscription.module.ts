import { Module, Provider, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subscription } from './subscription.entity';
import { NotificationModule } from '../notification/notification.module';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { ReactionModule } from '../reaction/reaction.module';
import { InformationModule } from '../information/information.module';

const SUBSCRIPTION_PAGE_SIZE = 'SUBSCRIPTION_PAGE_SIZE';
const SubscriptionPageSize: Provider = {
  provide: SUBSCRIPTION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    forwardRef(() => ReactionModule),
    forwardRef(() => InformationModule),
    NotificationModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionPageSize, SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
