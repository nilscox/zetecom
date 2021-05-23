import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { Paginated } from 'src/common/paginated';
import { NotificationPayload } from 'src/modules/notification/notification-payload';
import { User } from 'src/modules/user/user.entity';

import { Notification } from './notification.entity';
import { NotificationType } from './notification-type';

@Injectable()
export class NotificationService {
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

  async findForUser(user: User, page: number, pageSize: number, search?: string): Promise<Paginated<Notification>> {
    const qb = this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.user.id = :userId', { userId: user.id })
      .skip((page - 1) * pageSize)
      .take(pageSize);

    if (search) {
      const parameters = { search: `%${search}%` };

      qb.andWhere(
        new Brackets((qb) => {
          // prettier-ignore
          qb.orWhere("notification.payload->>'author' ILIKE :search", parameters)
            .orWhere("notification.payload->>'text' ILIKE :search", parameters);
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
