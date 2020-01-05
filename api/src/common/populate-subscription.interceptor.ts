import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from './transform.interceptor';
import { PopulateReaction } from './populate-reaction.interceptor';
import { Subscription } from '../modules/subscription/subscription.entity';
import { Reaction } from '../modules/reaction/reaction.entity';
import { ReactionService } from '../modules/reaction/reaction.service';
import { Information } from '../modules/information/information.entity';
import { PopulateInformation } from './populate-information.interceptor';
import { InformationService } from 'src/modules/information/information.service';

@Injectable()
export class PopulateSubscription extends TransformInterceptor<Subscription> {

  // nest can't resolve this when injected, even when added as a provider to the reaction module. wtf?
  private populateReaction: PopulateReaction;
  private populateInformation: PopulateInformation;

  constructor(reactionService: ReactionService, informationService: InformationService) {
    super();

    this.populateReaction = new PopulateReaction(reactionService);
    this.populateInformation = new PopulateInformation(informationService);
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
