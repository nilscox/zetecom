import axios from 'axios';

import { User } from '../../src/modules/user/user.entity';

import { UserDto } from './dtos/User';

export type AuthenticatedUser = User & {
  cookie: string;
};

const login = async (user: UserDto): Promise<AuthenticatedUser> => {
  const payload = {
    email: user.email,
    password: user.password,
  };

  const { data, headers } = await axios.post('/api/auth/login', payload);

  return {
    ...data,
    cookie: headers['set-cookie'][0].split(';')[0],
  };
};

const signup = async (user: UserDto): Promise<AuthenticatedUser> => {
  const payload = {
    email: user.email,
    password: user.password,
    nick: user.nick,
    avatar: user.avatar,
  };

  const { data, headers } = await axios.post('/api/auth/signup', payload);

  return {
    ...data,
    cookie: headers['set-cookie'][0].split(';')[0],
  };
};

export const loginOrSignup = async (user: UserDto): Promise<AuthenticatedUser> => {
  try {
    return await login(user);
  } catch (e) {
    if (!e.response || e.response.status !== 401)
      throw e;

    return signup(user);
  }
};
