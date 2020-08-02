import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationFactory } from './notification.factory';
import { NotificationService } from './notification.service';

const NOTIFICATION_PAGE_SIZE = 'NOTIFICATION_PAGE_SIZE';
const NotificationPageSize: Provider = {
  provide: NOTIFICATION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
  ],
  controllers: [
    NotificationController,
  ],
  providers: [
    NotificationPageSize,
    NotificationService,
    NotificationFactory,
  ],
  exports: [
    TypeOrmModule,
    NotificationFactory,
  ],
})
export class NotificationModule {}
