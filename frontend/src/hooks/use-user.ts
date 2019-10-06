import { useEffect, useState } from 'react';

import { parseUser, User } from 'src/types/User';

import useAxios from './use-axios';

const useUser = () => {
  const opts = { url: '/api/auth/me', validateStatus: (s: number) => [200, 403].includes(s), withCredentials: true };
  const [{ response, data, error, status }] = useAxios(opts, parseUser);
  const [user, setUser] = useState<User | undefined | null>();

  if (error)
    throw error;

  useEffect(() => {
    if (response) {
      if (status(200))
        setUser(data);
      else
        setUser(null);
    }
  }, [response, status, data]);

  return [user, setUser] as const;
};

export default useUser;
