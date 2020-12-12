import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Factory } from '../../testing/factory';
import { Role } from '../authorization/roles.enum';

import { User } from './user.entity';

export class UserFactory implements Factory<User> {
  private get repository() {
    return getRepository(User);
  }

  async create(override: Partial<Omit<User, 'id'>> = {}) {
    const rnd = Math.random().toString(32).slice(6);

    const data = {
      nick: `user_${rnd}`,
      email: `user_${rnd}@domain.tld`,
      password: `password_${rnd}`,
      emailValidationToken: uuidv4(),
      roles: [Role.USER],
      ...override,
    };

    data.password = await bcrypt.hash(data.password, 10);

    return this.repository.save(data);
  }

  async setEmailValidated(user: User, emailValidated) {
    await this.repository.update(user.id, { emailValidated });
  }
}
