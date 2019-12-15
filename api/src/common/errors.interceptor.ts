import { Injectable, NestInterceptor, ExecutionContext, HttpStatus, HttpException, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        console.log(err);

        if (!err.response || !err.response.message)
          return throwError(err);

        const { message } = err.response;

        if (typeof err.response.message === 'string')
          return throwError(err);

        const response = message.reduce((obj, error) => {
          obj[error.property] = error.constraints;
          return obj;
        }, {});

        return throwError(new HttpException(response, err.getStatus()));
      }),
    );
  }

}
