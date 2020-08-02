import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { FindConditions, Not, Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { Notification, NotificationType, SubscriptionReplyNotification } from '../../notification/notification.entity';
import { User, UserLight } from '../../user/user.entity';
import { Comment } from '../comment.entity';

import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {

  @Inject('SUBSCRIPTION_PAGE_SIZE')
  private pageSize: number;

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,

    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<SubscriptionReplyNotification>,
  ) {}

  public async subscribe(user: User, comment: Comment): Promise<Subscription> {
    // typeorm has trouble handling circular references (comment -> meassge -> comment)
    const subscription = this.subscriptionRepository.create({ user, comment: { id: comment.id } });

    return this.subscriptionRepository.save(subscription);
  }

  public async unsubscribe(subscription: Subscription): Promise<void> {
    await this.subscriptionRepository.remove(subscription);
  }

  public async getSubscription(user: User, comment: Comment): Promise<Subscription | undefined> {
    const where: FindConditions<Subscription> = { user, comment };

    return this.subscriptionRepository.findOne(where);
  }

  public async findAllForUser(user: User, page: number): Promise<Paginated<Subscription>> {
    const qb = this.subscriptionRepository.createQueryBuilder('comment_subscription')
      .leftJoinAndSelect('comment_subscription.comment', 'comment')
      .leftJoinAndSelect('comment.information', 'information')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.message', 'message')
      .where('user_id = :userId', { userId: user.id })
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  public async getSubscriptionsForUser(commentsIds: number[], userId: number): Promise<{ [commentId: number]: boolean }> {
    const subscriptions = await this.subscriptionRepository.createQueryBuilder('comment_subscription')
      .select('comment_id', 'commentId')
      .leftJoin('comment', 'comment', 'comment_subscription.comment_id = comment.id')
      .where('user_id = :userId', { userId })
      .andWhere('comment.id IN (' + commentsIds + ')')
      .getRawMany();

    return commentsIds.reduce((acc, commentId) => ({
      ...acc,
      [commentId]: !!subscriptions.find(s => s.commentId === commentId),
    }), {});
  }

  public async notifyReply(reply: Comment): Promise<void> {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        comment: reply.parent,
        user: Not(reply.author.id),
      },
      relations: ['user'],
    });

    const payload = {
      informationId: reply.information.id,
      commentId: reply.parent.id,
      replyId: reply.id,
      author: classToPlain(plainToClass(UserLight, reply.author), { strategy: 'excludeAll' }),
      text: reply.message.text,
    };

    const notifications = subscriptions.map(({ user }) => {
      return this.notificationRepository.create({
        type: NotificationType.SUBSCRIPTION_REPLY,
        user,
        payload,
      });
    });

    if (notifications.length > 0)
      await this.notificationRepository.insert(notifications);
  }

}
