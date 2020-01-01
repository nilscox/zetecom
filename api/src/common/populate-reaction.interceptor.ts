import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from './transform.interceptor';
import { ReactionService } from '../modules/reaction/reaction.service';
import { Reaction } from '../modules/reaction/reaction.entity';

@Injectable()
export class PopulateReaction extends TransformInterceptor<Reaction> {

  constructor(
    private readonly reactionService: ReactionService,
  ) {
    super();
  }

  async transform(reactions: Reaction[], request: any) {
    const { user } = request;

    if (reactions.length === 0)
      return [];

    await this.reactionService.addRepliesCounts(reactions);
    await this.reactionService.addQuickReactionsCounts(reactions);

    if (user) {
      await this.reactionService.addUserQuickReaction(reactions, user);
      await this.reactionService.addUserBookmarks(reactions, user);
      await this.reactionService.addUserSubscriptions(reactions, user);
    }
  }

}
