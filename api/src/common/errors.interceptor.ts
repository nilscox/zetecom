import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorResponse = { [key: string]: any };

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError(err => {
        if (!err.response || !err.response.message)
          return throwError(err);

        const { message } = err.response;

        if (typeof err.response.message === 'string')
          return throwError(err);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = message.reduce((obj: ErrorResponse, error: any) => {
          obj[error.property] = error.constraints;
          return obj;
        }, {});

        return throwError(new HttpException(response, err.getStatus()));
      }),
    );
  }

}
