import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { Information } from '../information/information.entity';
import { PopulateInformation } from '../information/populate-information.interceptor';
import { PopulateReaction } from '../reaction/populate-reaction.interceptor';
import { Reaction } from '../reaction/reaction.entity';

import { ReactionSubscription } from './subscription.entity';

@Injectable()
export class PopulateSubscription extends TransformInterceptor<ReactionSubscription> {

  async transform(subscriptions: ReactionSubscription[], request: any) {
    const reactions: Reaction[] = [];
    const informations: Information[] = [];

    subscriptions.forEach(subscription => {
      if (subscription.reaction) {
        reactions.push(subscription.reaction);

        reactions.forEach(reaction => informations.push(reaction.information));
      }
    });

    await new PopulateReaction().transform(reactions, request);
    await new PopulateInformation().transform([...new Set(informations)], request);
  }

}
