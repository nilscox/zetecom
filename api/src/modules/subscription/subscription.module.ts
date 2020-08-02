import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationModule } from '../notification/notification.module';

import { CommentSubscriptionController as CommentSubscriptionController } from './subscription.controller';
import { CommentSubscription } from './subscription.entity';
import { CommentSubscriptionService as CommentSubscriptionService } from './subscription.service';

const COMMENT_SUBSCRIPTION_PAGE_SIZE = 'COMMENT_SUBSCRIPTION_PAGE_SIZE';
const CommentSubscriptionPageSize: Provider = {
  provide: COMMENT_SUBSCRIPTION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentSubscription]),
    NotificationModule,
  ],
  controllers: [CommentSubscriptionController],
  providers: [CommentSubscriptionPageSize, CommentSubscriptionService],
  exports: [CommentSubscriptionService],
})
export class CommentSubscriptionModule {}
