import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Subscription } from './subscription.entity';

export class StripNullRelations implements NestInterceptor {

  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map(res => {
        res.items.forEach(i => this.transform(i));
        return res;
      }),
    );
  }

  transform(subscription: Subscription) {
    if (subscription.information === null)
      delete subscription.information;

    if (subscription.subject === null)
      delete subscription.subject;

    if (subscription.reaction === null)
      delete subscription.reaction;
  }

}
