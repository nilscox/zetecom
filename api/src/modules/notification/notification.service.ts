import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { NotificationPayload } from 'src/modules/notification/notification-payload';

import { User } from '../user/user.entity';

import { NotificationType } from './notification-type';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {

  @Inject('NOTIFICATION_PAGE_SIZE')
  private readonly pageSize: number;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(type: NotificationType, user: User, payload: NotificationPayload) {
    // TODO: fix notification types
    return this.notificationRepository.save({ type, payload, user } as unknown as DeepPartial<Notification>);
  }

  async findForUser(user: User, page: number): Promise<Paginated<Notification>> {
    const [items, total] = await this.notificationRepository.createQueryBuilder('notification')
      .where('notification.user.id = :userId', { userId: user.id })
      .orderBy('seen', 'DESC', 'NULLS FIRST')
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize)
      .getManyAndCount();

    return { items, total };
  }

  async countUnseenForUser(user: User): Promise<number> {
    return this.notificationRepository.createQueryBuilder('notification')
      .where('notification.user.id = :userId', { userId: user.id })
      .andWhere('seen IS NULL')
      .getCount();
  }

}
