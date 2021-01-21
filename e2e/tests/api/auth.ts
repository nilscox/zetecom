import { api } from './api';
import { User } from './seed';

export const login = ({ email, password }: Pick<User, 'email' | 'password'>) => {
  return api('/api/auth/login', {
    method: 'POST',
    body: {
      email,
      password,
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
