import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { Factory } from '../../testing/factory';

import { Notification } from './notification.entity';

@Injectable()
export class NotificationFactory implements Factory<Notification> {
  private get repository() {
    return getRepository(Notification);
  }

  async create(override: Partial<Omit<Notification, 'id'>>) {
    return this.repository.save(override);
  }

  async markAsSeen(notification: Notification, date = new Date()) {
    await this.repository.update(notification.id, { seen: date });
  }
}
