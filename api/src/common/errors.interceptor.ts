import { Injectable, NestInterceptor, ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    return call$.pipe(
      catchError(err => {
        const { message } = err.response;

        const response = message.reduce((obj, error) => {
          obj[error.property] = error.constraints;
          return obj;
        }, {});

        return throwError(new HttpException(response, err.getStatus()));
      }),
    );
  }

}
