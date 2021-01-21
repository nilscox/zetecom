import { forwardRef, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentModule } from 'src/modules/comment/comment.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { UserModule } from 'src/modules/user/user.module';

import { NotifySubscriptionReplyHandler } from './notifiy-subscription-reply.handler';
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
    CqrsModule,
    TypeOrmModule.forFeature([Subscription]),
    UserModule,
    forwardRef(() => CommentModule),
    NotificationModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionPageSize, SubscriptionService, NotifySubscriptionReplyHandler],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
