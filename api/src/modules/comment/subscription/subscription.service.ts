import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { FindConditions, Not, Repository } from 'typeorm';

import { Paginated } from 'src/common/paginated';
import { Comment } from 'src/modules/comment/comment.entity';
import { NotificationService } from 'src/modules/notification/notification.service';
import { SubscriptionReplyNotificationPayload } from 'src/modules/notification/notification-payload';
import { NotificationType } from 'src/modules/notification/notification-type';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { UserLightDto } from 'src/modules/user/dtos/user-ligth.dto';

import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly notificationService: NotificationService,
  ) {}

  public async subscribe(user: UserDto, comment: Comment): Promise<Subscription> {
    // typeorm has trouble handling circular references (comment -> meassge -> comment)
    const subscription = this.subscriptionRepository.create({ user, comment: { id: comment.id } });

    return this.subscriptionRepository.save(subscription);
  }

  public async unsubscribe(subscription: Subscription): Promise<void> {
    await this.subscriptionRepository.remove(subscription);
  }

  public async getSubscription(user: UserDto, comment: Comment): Promise<Subscription | undefined> {
    const where: FindConditions<Subscription> = { user, comment };

    return this.subscriptionRepository.findOne(where);
  }

  public async findAllForUser(user: UserDto, page: number, pageSize: number): Promise<Paginated<Subscription>> {
    const qb = this.subscriptionRepository
      .createQueryBuilder('comment_subscription')
      .leftJoinAndSelect('comment_subscription.comment', 'comment')
      .leftJoinAndSelect('comment.commentsArea', 'commentsArea')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.message', 'message')
      .where('user_id = :userId', { userId: user.id })
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  public async getSubscriptionsForUser(
    commentsIds: number[],
    userId: number,
  ): Promise<{ [commentId: number]: boolean }> {
    const subscriptions = await this.subscriptionRepository
      .createQueryBuilder('comment_subscription')
      .select('comment_id', 'commentId')
      .leftJoin('comment', 'comment', 'comment_subscription.comment_id = comment.id')
      .where('user_id = :userId', { userId })
      .andWhere('comment.id IN (' + commentsIds + ')')
      .getRawMany();

    return commentsIds.reduce(
      (acc, commentId) => ({
        ...acc,
        [commentId]: !!subscriptions.find((s) => s.commentId === commentId),
      }),
      {},
    );
  }

  public async notifyReply(reply: Comment): Promise<void> {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        comment: reply.parent,
        user: Not(reply.author.id),
      },
      relations: ['user'],
    });

    const payload: SubscriptionReplyNotificationPayload = {
      commentsAreaId: reply.commentsArea.id,
      commentsAreaTitle: reply.commentsArea.informationTitle,
      commentId: reply.parent.id,
      replyId: reply.id,
      author: classToPlain(plainToClass(UserLightDto, reply.author), { strategy: 'excludeAll' }) as UserLightDto,
      text: reply.message.text,
    };

    this.notificationService.createMultiple(
      NotificationType.SUBSCRIPTION_REPLY,
      subscriptions.map(({ user }) => user),
      payload,
    );
  }
}
