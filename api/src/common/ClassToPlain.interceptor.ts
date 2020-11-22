import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = any;

@Injectable()
export class ClassToPlainInterceptor implements NestInterceptor {
  transform = (data: Data) => {
    if (typeof data === 'object' && 'items' in data && 'total' in data)
      return { items: classToPlain(data.items, { strategy: 'excludeAll' }), total: data.total };

    return classToPlain(data, { strategy: 'excludeAll' });
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<Data> {
    return next
      .handle()
      .pipe(map(this.transform));
  }
}
