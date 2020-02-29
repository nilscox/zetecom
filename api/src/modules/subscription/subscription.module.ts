import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformationModule } from '../information/information.module';
import { NotificationModule } from '../notification/notification.module';
import { ReactionModule } from '../reaction/reaction.module';

import { SubscriptionController } from './subscription.controller';
import { Subscription } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

const SUBSCRIPTION_PAGE_SIZE = 'SUBSCRIPTION_PAGE_SIZE';
const SubscriptionPageSize: Provider = {
  provide: SUBSCRIPTION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    NotificationModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionPageSize, SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
