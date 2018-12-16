import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class CorsDevMiddleware implements NestMiddleware {

  resolve(...args: any[]): MiddlewareFunction {
    if (process.env.NODE_ENV !== 'development')
      return (req, res, next) => { next(); };

    return async (req, res, next) => {
      res.append('Access-Control-Allow-Origin', req.get('origin') || '*');
      res.append('Access-Control-Allow-Headers', 'Content-Type');
      res.append('Access-Control-Allow-Credentials', 'true');

      next();
    };
  }

}
