import { Injectable } from '@nestjs/common';

import { UserService } from '../../modules/user/user.service';
import { Factory } from '../../testing/factory';

import { User } from './user.entity';

type UserFactoryOptions = {
  nick?: string;
  email?: string;
  password?: string;
};

@Injectable()
export class UserFactory implements Factory<UserFactoryOptions, User> {
  constructor(
    private readonly userService: UserService,
  ) {}

  async create(opts: UserFactoryOptions = {}) {
    const rnd = Math.random().toString(32).slice(6);

    const data = {
      nick: `user_${rnd}`,
      email: `user_${rnd}@domain.tld`,
      password: `password_${rnd}`,
      ...opts,
    };

    return this.userService.create(data);
  }
}
