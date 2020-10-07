import React, { createContext, useContext, useEffect, useState } from 'react';

import useAxios from 'src/hooks/use-axios';
import { parseUser, User } from 'src/types/User';

export type UserContextType = [
  undefined | null | User,
  (user: User) => void,
];

export const UserContext = createContext<UserContextType>(null);

export const useUser = () => useContext(UserContext);
export const useCurrentUser = () => {
  const user = useUser();

  if (!user) {
    throw new Error('user should not be null');
  }

  return user[0];
};

export const UserProvider: React.FC = ({ children }) => {
  const opts = { url: '/api/auth/me', validateStatus: (s: number) => [200, 403].includes(s) };
  const [{ response, data, error, status }] = useAxios(opts, parseUser);
  const [user, setUser] = useState<undefined | null | User>();

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (response) {
      if (status([200, 304])) {
        setUser(data);
      } else {
        setUser(null);
      }
    }
  }, [response, status, data]);

  return <UserContext.Provider value={[user, setUser]}>{ children }</UserContext.Provider>;
};
