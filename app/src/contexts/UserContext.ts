import { useEffect, useState } from 'react';

import useAxios from 'src/hooks/use-axios';
import { parseUser, User } from 'src/types/User';

import { useAppContext } from './AppContext';

export type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserContext = () => {
  const opts = { url: '/api/auth/me', validateStatus: (s: number) => [200, 403].includes(s) };
  const [{ response, data, error, status }] = useAxios(opts, parseUser);
  const [user, setUser] = useState<User | undefined | null>();

  if (error)
    throw error;

  useEffect(() => {
    if (response) {
      if (status([200, 304]))
        setUser(data);
      else
        setUser(null);
    }
  }, [response, status, data]);

  return { user, setUser };
};

export const useUser = () => {
  const { user: { user, setUser } } = useAppContext();
  return [user, setUser] as const;
};

export const useCurrentUser = () => {
  const { user: { user } } = useAppContext();
  return user;
};
