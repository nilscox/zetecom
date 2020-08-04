import { Injectable } from '@nestjs/common';

import { NotificationPayload } from 'src/modules/notification/notification-payload';

import { Factory } from '../../testing/factory';
import { User } from '../user/user.entity';

import { NotificationType } from './notification-type';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

type NotificationFactoryOpts = {
  type: NotificationType;
  user: User;
  payload: NotificationPayload;
};

@Injectable()
export class NotificationFactory implements Factory<NotificationFactoryOpts, Notification> {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  async create(data?: NotificationFactoryOpts) {
    if (!data)
      throw new Error('NotificationFactory: data must be provided');

    return this.notificationService.create(data.type, data.user, data.payload);
  }
}
