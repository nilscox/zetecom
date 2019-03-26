import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';

import { ReactionService } from '../modules/reaction/reaction.service';
import { Reaction } from '../modules/reaction/reaction.entity';

@Injectable()
export class PopulateReaction implements NestInterceptor {

  constructor(
    private readonly reactionService: ReactionService,
  ) {}

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return from(call$
      .toPromise()
      .then(async (res: Reaction | Reaction[]) => {
        if (!Array.isArray(res))
          res = [res];

        await this.reactionService.addRepliesCounts(res);
        await this.reactionService.addShortRepliesCounts(res);

        if (user)
          await this.reactionService.addUserShortReply(res, user);

        return res;
      }));
  }

}
