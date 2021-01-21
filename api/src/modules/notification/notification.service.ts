import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { Paginated } from 'src/common/paginated';
import { NotificationPayload } from 'src/modules/notification/notification-payload';
import { User } from 'src/modules/user/user.entity';

import { Notification } from './notification.entity';
import { NotificationType } from './notification-type';

@Injectable()
export class NotificationService {
  @Inject('NOTIFICATION_PAGE_SIZE')
  private readonly pageSize: number;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create<T extends NotificationType>(type: T, user: User, payload: NotificationPayload[T]) {
    return this.createMultiple(type, [user], payload);
  }

  async createMultiple<T extends NotificationType>(type: T, users: User[], payload: NotificationPayload[T]) {
    return this.notificationRepository.insert(users.map((user) => ({ type, payload, user })));
  }

  async findForUser(user: User, page: number, search?: string): Promise<Paginated<Notification>> {
    const qb = this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.user.id = :userId', { userId: user.id })
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize);

    if (search) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where("notification.payload->>'commentsAreaTitle' ILIKE :search", { search: `%${search}%` })
            .orWhere("notification.payload->>'author' ILIKE :search", { search: `%${search}%` })
            .orWhere("notification.payload->>'text' ILIKE :search", { search: `%${search}%` });
        }),
      );
    }

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async countUnseenForUser(user: User): Promise<number> {
    return this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.user.id = :userId', { userId: user.id })
      .andWhere('seen IS NULL')
      .getCount();
  }
}
