import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { from, Observable } from 'rxjs';

export abstract class TransformInterceptor<In, Out> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return from(
      next.handle()
        .toPromise()
        .then((res: any) => this.transform(res, request))
    );
  }

  abstract transform(data: In, request: any): Out | Promise<Out>;
}
