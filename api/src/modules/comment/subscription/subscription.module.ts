import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationModule } from '../../notification/notification.module';
import { UserModule } from '../../user/user.module';
import { CommentModule } from '../comment.module';

import { SubscriptionController } from './subscription.controller';
import { Subscription } from './subscription.entity';
import { SubscriptionFactory } from './subscription.factory';
import { SubscriptionService } from './subscription.service';

const SUBSCRIPTION_PAGE_SIZE = 'SUBSCRIPTION_PAGE_SIZE';
const SubscriptionPageSize: Provider = {
  provide: SUBSCRIPTION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    UserModule,
    forwardRef(() => CommentModule),
    NotificationModule,
  ],
  controllers: [
    SubscriptionController,
  ],
  providers: [
    SubscriptionPageSize,
    SubscriptionService,
    SubscriptionFactory,
  ],
  exports: [
    SubscriptionService,
    SubscriptionFactory,
  ],
})
export class SubscriptionModule {}
