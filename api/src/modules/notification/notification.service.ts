import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { User } from '../user/user.entity';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {

  @Inject('NOTIFICATION_PAGE_SIZE')
  private readonly pageSize: number;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async findForUser(user: User, seen: boolean, page: number): Promise<Paginated<Notification>> {
    const [items, total] = await this.notificationRepository.findAndCount({
      where: { user, seen: seen ? Not(IsNull()) : IsNull() },
      skip: (page - 1) * this.pageSize,
      take: this.pageSize,
    });

    return { items, total };
  }

}
