import { Injectable } from '@nestjs/common';

import { Factory } from '../../testing/factory';
import { User } from '../user/user.entity';

import { Notification, NotificationPayload, NotificationType } from './notification.entity';
import { NotificationService } from './notification.service';

type NotificationFactoryOpts<T extends NotificationType> = {
  type: T;
  user: User;
  payload: NotificationPayload[T];
};

@Injectable()
export class NotificationFactory implements Factory<NotificationFactoryOpts<any>, Notification<any>> {
  constructor(
    private readonly notificationService: NotificationService<any>,
  ) {}

  async create<T extends NotificationType>(data?: NotificationFactoryOpts<T>) {
    if (!data)
      throw new Error('NotificationFactory: data must be provided');

    return this.notificationService.create(data.type, data.user, data.payload);
  }
}
