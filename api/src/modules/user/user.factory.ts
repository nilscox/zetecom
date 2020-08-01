import { Injectable } from '@nestjs/common';

import { UserService } from '../../modules/user/user.service';

import { User } from './user.entity';

type UserFactoryData = {
  nick?: string;
  email?: string;
  password?: string;
  emailValidated?: boolean;
  emailLoginToken?: string;
};

@Injectable()
export class UserFactory implements Factory<UserFactoryData, User> {
  constructor(
    private readonly userService: UserService,
  ) {}

  create(data: UserFactoryData = {}) {
    const rnd = Math.random().toString(32).slice(6);

    return this.userService.create({
      nick: `user_${rnd}`,
      email: `user_${rnd}@domain.tld`,
      password: `password_${rnd}`,
      ...data,
    });
  }
}
