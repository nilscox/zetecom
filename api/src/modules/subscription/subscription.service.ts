import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { FindConditions, Not, Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { Notification, NotificationType, SubscriptionReplyNotification } from '../notification/notification.entity';
import { Reaction } from '../reaction/reaction.entity';
import { UserLightOutDto } from '../user/dtos/user-light-out.dto';
import { User } from '../user/user.entity';

import { ReactionSubscription } from './subscription.entity';

@Injectable()
export class ReactionSubscriptionService {

  @Inject('REACTION_SUBSCRIPTION_PAGE_SIZE')
  private pageSize: number;

  constructor(
    @InjectRepository(ReactionSubscription)
    private readonly subscriptionRepository: Repository<ReactionSubscription>,

    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<SubscriptionReplyNotification>,
  ) {}

  public async subscribe(user: User, reaction: Reaction): Promise<ReactionSubscription> {
    // typeorm has trouble handling circular references (reaction -> meassge -> reaction)
    const subscription = this.subscriptionRepository.create({ user, reaction: { id: reaction.id } });

    return this.subscriptionRepository.save(subscription);
  }

  public async unsubscribe(subscription: ReactionSubscription): Promise<void> {
    await this.subscriptionRepository.remove(subscription);
  }

  public async getSubscription(user: User, reaction: Reaction): Promise<ReactionSubscription | undefined> {
    const where: FindConditions<ReactionSubscription> = { user, reaction };

    return this.subscriptionRepository.findOne(where);
  }

  public async findAllForUser(user: User, page: number): Promise<Paginated<ReactionSubscription>> {
    const qb = this.subscriptionRepository.createQueryBuilder('reaction_subscription')
      .leftJoinAndSelect('reaction_subscription.reaction', 'reaction')
      .leftJoinAndSelect('reaction.information', 'information')
      .leftJoinAndSelect('reaction.author', 'author')
      .leftJoinAndSelect('reaction.message', 'message')
      .where('user_id = :userId', { userId: user.id })
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize);

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  public async getSubscriptionsForUser(reactionIds: number[], userId: number): Promise<{ [reactionId: number]: boolean }> {
    const subscriptions = await this.subscriptionRepository.createQueryBuilder('reaction_subscription')
      .select('reaction_id', 'reactionId')
      .leftJoin('reaction', 'reaction', 'reaction_subscription.reaction_id = reaction.id')
      .where('user_id = :userId', { userId })
      .andWhere('reaction.id IN (' + reactionIds + ')')
      .getRawMany();

    return reactionIds.reduce((acc, reactionId) => ({
      ...acc,
      [reactionId]: !!subscriptions.find(s => s.reactionId === reactionId),
    }), {});
  }

  public async notifyReply(reply: Reaction): Promise<void> {
    const subscriptions = await this.subscriptionRepository.find({
      where: {
        reaction: reply.parent,
        user: Not(reply.author.id),
      },
      relations: ['user'],
    });

    const payload = {
      informationId: reply.information.id,
      reactionId: reply.parent.id,
      replyId: reply.id,
      author: classToPlain(plainToClass(UserLightOutDto, reply.author), { strategy: 'excludeAll' }),
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
