import { api } from './api';
import { User } from './seed';

export const login = (user: User) => {
  return api('/api/auth/login', {
    method: 'POST',
    body: {
      email: user.email,
      password: user.password,
    },
  });
};

export const logout = () => {
  return api('/api/auth/logout', {
    method: 'POST',
  });
};

export const me = () => {
  return api('/api/auth/me');
};
