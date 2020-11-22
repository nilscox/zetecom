import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { from, Observable } from 'rxjs';

export abstract class TransformInterceptor<In, Out> implements NestInterceptor<In, Out> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Out> {
    const request = context.switchToHttp().getRequest<Request>();

    return from(
      next.handle()
        .toPromise()
        .then((res: In) => this.transform(res, request))
    );
  }

  abstract transform(data: In, request: Request): Out | Promise<Out>;
}
