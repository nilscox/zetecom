import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, from } from 'rxjs';

export abstract class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return from(
      next.handle()
        .toPromise()
        .then(async (res: any) => {
          const items = 'items' in res ? res.items : Array.isArray(res) ? res : [res];

          if (items.length > 0)
            await this.transform(items, request);

          return res;
        }),
    );
  }

  abstract transform(data: T[], request: any): any | Promise<any>;
}
