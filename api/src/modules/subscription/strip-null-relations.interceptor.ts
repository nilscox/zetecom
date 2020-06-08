import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReactionSubscription } from './subscription.entity';

export class StripNullRelations implements NestInterceptor {

  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map(res => {
        res.items.forEach((i: ReactionSubscription) => this.transform(i));
        return res;
      }),
    );
  }

  transform(subscription: ReactionSubscription) {
    if (subscription.reaction === null)
      delete subscription.reaction;
  }

}
