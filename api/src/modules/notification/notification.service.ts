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
    const [items, total] = await this.notificationRepository.createQueryBuilder('notification')
      .innerJoinAndSelect('notification.subscription', 'subscription')
      .innerJoinAndSelect('subscription.reaction', 'reaction')
      .innerJoinAndSelect('reaction.information', 'information')
      .innerJoinAndSelect('reaction.author', 'author')
      .innerJoinAndSelect('reaction.messages', 'messages')
      .where('subscription.user.id = :userId', { userId: user.id })
      .andWhere('seen IS ' + (seen ? 'NOT NULL' : 'NULL'))
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize)
      .getManyAndCount();

    return { items, total };
  }

}
