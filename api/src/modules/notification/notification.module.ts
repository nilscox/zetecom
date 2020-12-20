import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';

import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

const NOTIFICATION_PAGE_SIZE = 'NOTIFICATION_PAGE_SIZE';
const NotificationPageSize: Provider = {
  provide: NOTIFICATION_PAGE_SIZE,
  useValue: 10,
};

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UserModule],
  controllers: [NotificationController],
  providers: [NotificationPageSize, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
