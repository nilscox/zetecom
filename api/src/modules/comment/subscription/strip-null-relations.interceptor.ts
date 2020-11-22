import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Subscription } from './subscription.entity';

export class StripNullRelations implements NestInterceptor {

  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map(res => {
        res.items.forEach((i: Subscription) => this.transform(i));
        return res;
      }),
    );
  }

  transform(subscription: Subscription) {
    if (subscription.comment === null)
      delete subscription.comment;
  }

}
