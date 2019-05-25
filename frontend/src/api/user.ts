import axios from 'axios';

import { User, parseUser } from '../types/User';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseData = any;

const fetchUser = async (): Promise<User | undefined> => {
  const { status, data } = await axios.get('/api/auth/me', {
    validateStatus: s => [200, 403].indexOf(s) >= 0,
    withCredentials: true,
  });

  if (status === 403)
    return;

  return parseUser(data);
};

type LoginUserArgs = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginUserArgs): Promise<User> => {
  const { data } = await axios.post('/api/auth/login', {
    email,
    password,
  }, {
    withCredentials: true,
  });

  return parseUser(data);
};

type SignupUserArgs = {
  email: string;
  password: string;
  nick: string;
  avatar?: string;
};

const signupUser = async ({ email, password, nick, avatar }: SignupUserArgs): Promise<User> => {
  const { data } = await axios.post('/api/auth/signup', {
    email,
    password,
    nick,
    avatar,
  }, {
    withCredentials: true,
  });

  return parseUser(data);
};

const logoutUser = async (): Promise<void> => {
  await axios.post('/api/auth/logout', {}, {
    withCredentials: true,
  });
};

export {
  fetchUser,
  loginUser,
  signupUser,
  logoutUser,
};
