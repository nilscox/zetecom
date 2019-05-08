import { useEffect, useState } from 'react';

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

export { fetchUser };
