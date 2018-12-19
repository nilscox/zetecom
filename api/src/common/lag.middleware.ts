import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LagMiddleware implements NestMiddleware {

  resolve(delay: number): MiddlewareFunction {
    return async (req, res, next) => setTimeout(next, delay);
  }

}
