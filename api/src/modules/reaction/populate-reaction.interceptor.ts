import { Injectable } from '@nestjs/common';
import { getCustomRepository, getRepository } from 'typeorm';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { Subscription } from '../subscription/subscription.entity';
import { User } from '../user/user.entity';

import { QuickReactionType } from './quick-reaction.entity';
import { Reaction } from './reaction.entity';
import { ReactionRepository } from './reaction.repository';

@Injectable()
export class PopulateReaction extends TransformInterceptor<Reaction> {

  get reactionRepository() {
    return getCustomRepository(ReactionRepository);
  }

  get subscriptionRepository() {
    return getRepository(Subscription);
  }

  async transform(reactions: Reaction[], request: any) {
    const { user } = request;

    await this.addHistories(reactions);
    await this.addRepliesCounts(reactions);
    await this.addQuickReactionsCounts(reactions);

    if (user) {
      await this.addUserQuickReaction(reactions, user);
      await this.addUserSubscriptions(reactions, user);
    }
  }

  private async addHistories(reactions: Reaction[]): Promise<Reaction[]> {
    const reactionWithHistories = await this.reactionRepository.createQueryBuilder('reaction')
      .leftJoinAndSelect('reaction.history', 'history')
      .where('reaction.id IN (' + reactions.map(r => r.id) + ')')
      .orderBy('history.created', 'DESC')
      .getMany();

    reactions.forEach(reaction => {
      reaction.history = reactionWithHistories.find(r => r.id === reaction.id).history.slice(1);
    });

    return reactions;
  }

  private async addRepliesCounts(reactions: Reaction[]): Promise<Reaction[]> {
    const repliesCounts = await this.reactionRepository.getRepliesCounts(reactions.map(r => r.id));

    reactions.forEach(reaction => {
      const reply = repliesCounts.find(r => r.reactionId === reaction.id);

      if (reply)
        reaction.repliesCount = reply.repliesCount;
      else
        reaction.repliesCount = 0;
    });

    return reactions;
  }

  private async addQuickReactionsCounts(reactions: Reaction[]): Promise<void> {
    const quickReactionsCounts = await this.reactionRepository.getQuickReactionsCounts(reactions.map(r => r.id));

    const getQuickReactionsCount = (reactionId: number, type: QuickReactionType): number => {
      return quickReactionsCounts.find(qrc => qrc.reactionId === reactionId).quickReactions[type];
    };

    reactions.forEach(reaction => {
      reaction.quickReactionsCount = {
        APPROVE: getQuickReactionsCount(reaction.id, QuickReactionType.APPROVE),
        REFUTE: getQuickReactionsCount(reaction.id, QuickReactionType.REFUTE),
        SKEPTIC: getQuickReactionsCount(reaction.id, QuickReactionType.SKEPTIC),
      };
    });
  }

  private async addUserQuickReaction(reactions: Reaction[], user: User): Promise<void> {
    const quickReactions = await this.reactionRepository.getQuickReactionForUser(reactions.map(r => r.id), user.id);

    reactions.forEach((reaction) => {
      const quickReaction = quickReactions.find(qr => qr.reactionId === reaction.id);

      reaction.userQuickReaction = quickReaction ? quickReaction.type : null;
    });
  }

  private async addUserSubscriptions(reactions: Reaction[], user: User): Promise<void> {
    // TODO: handle this in subscription repository
    const results = await this.subscriptionRepository.createQueryBuilder('subscription')
      .select('reaction_id', 'reactionId')
      .leftJoin('reaction', 'reaction', 'subscription.reaction_id = reaction.id')
      .where('user_id = :userId', { userId: user.id })
      .andWhere('reaction.id IN (' + reactions.map(r => r.id) + ')')
      .getRawMany();

    const subscriptions = reactions.reduce((acc, { id: reactionId }) => ({
      ...acc,
      [reactionId]: !!results.find(s => s.reactionId === reactionId),
    }), {});

    reactions.forEach((reaction) => {
      reaction.subscribed = subscriptions[reaction.id];
    });
  }

}
