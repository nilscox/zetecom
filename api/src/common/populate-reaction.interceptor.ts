import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';

import { ReactionService } from '../modules/reaction/reaction.service';
import { Reaction } from '../modules/reaction/reaction.entity';
import { User } from '../modules/user/user.entity';

@Injectable()
export class PopulateReaction implements NestInterceptor {

  constructor(
    private readonly reactionService: ReactionService,
  ) {}

  private async populateReactions(reactions: Reaction[], user?: User) {
    if (reactions.length === 0)
      return [];

    await this.reactionService.addRepliesCounts(reactions);
    await this.reactionService.addQuickReactionsCounts(reactions);

    if (user)
      await this.reactionService.addUserQuickReaction(reactions, user);
  }

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return from(call$
      .toPromise()
      .then(async (res: Reaction | Reaction[]) => {
        await this.populateReactions(Array.isArray(res) ? res : [res], user);

        return res;
      }));
  }

}
