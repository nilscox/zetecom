import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CommentSubscription } from './subscription.entity';

export class StripNullRelations implements NestInterceptor {

  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map(res => {
        res.items.forEach((i: CommentSubscription) => this.transform(i));
        return res;
      }),
    );
  }

  transform(subscription: CommentSubscription) {
    if (subscription.comment === null)
      delete subscription.comment;
  }

}
