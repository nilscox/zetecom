import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../modules/user/user.entity';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async use(req: any, res: any, next: (err?: any) => void) {
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
  }

}
