import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';

import { Notification, NotificationType } from './notification.entity';

@Injectable()
export class NotificationService<T extends NotificationType> {

  @Inject('NOTIFICATION_PAGE_SIZE')
  private readonly pageSize: number;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification<T>>,
  ) {}

  async findForUser(user: User, page: number): Promise<Paginated<Notification<T>>> {
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
