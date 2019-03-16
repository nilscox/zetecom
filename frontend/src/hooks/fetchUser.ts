import { useEffect, useState } from 'react';

import axios from 'axios';

import { User } from '../types/User';

const parseUser = (data: any): User => {
  return {
    ...data,
    created: new Date(data.created),
    updated: new Date(data.updated),
  };
};

const fetchUser = (token: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get('/api/auth/me', {
      validateStatus: (s: number) => [200, 403].indexOf(s) >= 0,
    })
      .then(({ status, data }) => {
        if (status === 200) {
          setUser(parseUser(data));
        } else if (token) {
          return axios.post('/api/auth/tokenLogin', { token }, {
            validateStatus: (s: number) => [200, 401].indexOf(s) >= 0,
          });
        }
      })
      .then(response => {
        if (!response)
          return;

        const { status, data } = response;

        if (status === 200)
          setUser(parseUser(data.user));
        else
          console.warn('cannot login with token');
      });
  }, [token]);

  return user;
};

export { fetchUser };
