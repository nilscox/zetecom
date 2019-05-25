import axios from 'axios';

import { User, parseUser } from '../types/User';

const fetchUser = async (): Promise<User | undefined> => {
  const { status, data } = await axios.get('/api/auth/me', {
    validateStatus: s => [200, 403].indexOf(s) >= 0,
    withCredentials: true,
  });

  if (status === 403)
    return;

  return parseUser(data);
};

const loginUser = async ({ email, password }: any): Promise<User> => {
  const { data } = await axios.post('/api/auth/login', {
    email,
    password,
  }, {
    withCredentials: true,
  });

  return parseUser(data);
};

const signupUser = async ({ email, password, nick, avatar }: any): Promise<User> => {
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
