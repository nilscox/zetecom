import axios from 'axios';
import { plainToClass } from 'class-transformer';

import { UserOutDto } from '../../src/modules/user/dtos/user-out.dto';

import { User } from './dtos/User';

export type AuthenticatedUser = UserOutDto & {
  cookie: string;
};

const login = async (user: User): Promise<AuthenticatedUser> => {
  const payload = {
    email: user.email,
    password: user.password,
  };

  const { data, headers } = await axios.post('/api/auth/login', payload);

  return {
    ...plainToClass(UserOutDto, data),
    cookie: headers['set-cookie'][0].split(';')[0],
  };
};

const signup = async (user: User): Promise<AuthenticatedUser> => {
  const payload = {
    email: user.email,
    password: user.password,
    nick: user.nick,
  };

  const { data, headers } = await axios.post('/api/auth/signup', payload);

  return {
    ...plainToClass(UserOutDto, data),
    cookie: headers['set-cookie'][0].split(';')[0],
  };
};

export const loginOrSignup = async (user: User): Promise<AuthenticatedUser> => {
  try {
    return await login(user);
  } catch (e) {
    if (!e.response || e.response.status !== 401)
      throw e;

    return signup(user);
  }
};
