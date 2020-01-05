import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { PopulateReaction } from '../reaction/populate-reaction.interceptor';
import { Subscription } from './subscription.entity';
import { Reaction } from '../reaction/reaction.entity';
import { ReactionService } from '../reaction/reaction.service';
import { Information } from '../information/information.entity';
import { PopulateInformation } from '../information/populate-information.interceptor';
import { InformationService } from '../information/information.service';

@Injectable()
export class PopulateSubscription extends TransformInterceptor<Subscription> {

  constructor(
    private readonly populateReaction: PopulateReaction,
    private readonly populateInformation: PopulateInformation,
  ) {
    super();
  }

  async transform(subscriptions: Subscription[], request: any) {
    const reactions: Reaction[] = [];
    const informations: Information[] = [];

    subscriptions.forEach(subscription => {
      if (subscription.reaction) {
        reactions.push(subscription.reaction);

        reactions.forEach(reaction => informations.push(reaction.information));
      }
    });

    await this.populateReaction.transform(reactions, request);
    await this.populateInformation.transform([...new Set(informations)]);
  }

}
