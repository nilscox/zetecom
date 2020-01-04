import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from './transform.interceptor';
import { PopulateReaction } from './populate-reaction.interceptor';
import { Subscription } from '../modules/subscription/subscription.entity';
import { Reaction } from '../modules/reaction/reaction.entity';
import { ReactionService } from '../modules/reaction/reaction.service';

@Injectable()
export class PopulateSubscription extends TransformInterceptor<Subscription> {

  // nest can't resolve this when injected, even when added as a provider to the reaction module. wtf?
  private populateReaction: PopulateReaction;

  constructor(reactionService: ReactionService) {
    super();

    this.populateReaction = new PopulateReaction(reactionService);
  }

  async transform(subscriptions: Subscription[], request: any) {
    const reactions: Reaction[] = [];

    subscriptions.forEach(subscription => {
      if (subscription.reaction)
        reactions.push(subscription.reaction);
    });

    await this.populateReaction.transform(reactions, request);
  }

}
