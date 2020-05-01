import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Not, Repository } from 'typeorm';

import { Paginated } from 'Common/paginated';

import { Information } from '../information/information.entity';
import { Notification } from '../notification/notification.entity';
import { Reaction } from '../reaction/reaction.entity';
import { User } from '../user/user.entity';

import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {

  @Inject('SUBSCRIPTION_PAGE_SIZE')
  private pageSize: number;

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,

    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  public async subscribe(user: User, entity: Information | Reaction): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create({ user });

    if (entity.constructor.name === Information.name)
      subscription.information = entity as Information;
    else if (entity.constructor.name === Reaction.name)
      subscription.reaction = entity as Reaction;
    else
      throw new Error('subscribe: invalid subscription entity type');

    return this.subscriptionRepository.save(subscription);
  }

  public async unsubscribe(subscription: Subscription): Promise<void> {
    await this.subscriptionRepository.remove(subscription);
  }

  public async getSubscription(user: User, entity: Information | Reaction): Promise<Subscription | undefined> {
    const where: FindConditions<Subscription> = { user };

    if (entity.constructor.name === Information.name)
      where.information = entity as Information;
    else if (entity.constructor.name === Reaction.name)
      where.reaction = entity as Reaction;
    else
      throw new Error('getSubscription: invalid subscription entity type');

    return this.subscriptionRepository.findOne(where);
  }

  public async findAllForUser(user: User, informationId: number | undefined, page: number): Promise<Paginated<Subscription>> {
    const qb = this.subscriptionRepository.createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.reaction', 'reaction')
      .leftJoinAndSelect('reaction.information', 'information')
      .leftJoinAndSelect('reaction.author', 'author')
      .leftJoinAndSelect('reaction.message', 'message')
      .where('user_id = :userId', { userId: user.id })
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize);

    if (informationId)
      qb.andWhere('information.id = :informationId', { informationId });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  public async getSubscriptionsForUser(reactionIds: number[], userId: number): Promise<{ [reactionId: number]: boolean }> {
    const subscriptions = await this.subscriptionRepository.createQueryBuilder('subscription')
      .select('reaction_id', 'reactionId')
      .leftJoin('reaction', 'reaction', 'subscription.reaction_id = reaction.id')
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

    const notifications = subscriptions.map(subscription => {
      return this.notificationRepository.create({
        subscription,
        actor: reply.author,
      });
    });

    if (notifications.length > 0)
      await this.notificationRepository.insert(notifications);
  }

}
