import { useEffect, useState } from 'react';

import axios from 'axios';

import { User, parseUser } from '../types/User';

const fetchUser = async (token: string) => {
  const { status, data } = await axios.get('/api/auth/me', {
    validateStatus: s => [200, 403].indexOf(s) >= 0,
    withCredentials: true,
  });

  if (status === 200) {
    return parseUser(data);
  } else if (token) {
    const { status, data } = await axios.post('/api/auth/tokenLogin', { token }, {
      validateStatus: s => [200, 401].indexOf(s) >= 0,
      withCredentials: true,
    });

    if (status === 200)
      return parseUser(data.user);
    else
      console.warn('cannot login with token');
  }
};

export { fetchUser };
