import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';

const NOTIFICATION_PAGE_SIZE = 'NOTIFICATION_PAGE_SIZE';
const NotificationPageSize: Provider = {
  provide: NOTIFICATION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
  ],
  controllers: [NotificationController],
  providers: [NotificationPageSize, NotificationService],
  exports: [TypeOrmModule],
})
export class NotificationModule {}
