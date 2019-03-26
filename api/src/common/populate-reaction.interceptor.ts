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
        const many = Array.isArray(res);

        if (!many)
          res = [res] as Reaction[];

        await this.reactionService.addRepliesCounts(res as Reaction[]);
        await this.reactionService.addShortRepliesCounts(res as Reaction[]);

        if (user)
          await this.reactionService.addUserShortReply(res as Reaction[], user);

        return many ? res : res[0];
      }));
  }

}
