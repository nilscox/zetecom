import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../modules/user/user.entity';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  resolve(...args: any[]): MiddlewareFunction {
    return async (req, res, next) => {
      const { userId } = req.session;

      if (!userId)
        return next();

      let user = null;

      try {
        user = await this.userRepository.findOne(userId);
      } catch (e) {
        return next(e);
      }

      if (user)
        req.user = user;
      else
        delete req.userId;

      next();
    };
  }

}
