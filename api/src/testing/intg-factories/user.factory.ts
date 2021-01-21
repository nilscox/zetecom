import bcrypt from 'bcrypt';
import { DeepPartial, getManager } from 'typeorm';

import { Role } from 'src/modules/authorization/roles.enum';
import { User } from 'src/modules/user/user.entity';

export const createUser = async (data: DeepPartial<User> = {}) => {
  const manager = getManager();

  const rnd = Math.random().toString(32).slice(6);

  const user = manager.create(User, {
    nick: `user_${rnd}`,
    email: `user_${rnd}@domain.tld`,
    password: `password_${rnd}`,
    emailValidationToken: 'token',
    emailValidated: true,
    roles: [Role.USER],
    ...data,
  });

  if (data.password)
    user.password = await bcrypt.hash(data.password, 10);

  return manager.save(user);
};
