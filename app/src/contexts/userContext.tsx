import React, { createContext, useContext, useEffect, useState } from 'react';

import useAxios from 'src/hooks/useAxios';
import { User } from 'src/types/User';

type UserContextType = [User | null | undefined, (user: User | null) => void];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userContext = createContext<UserContextType>(null as any);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();

  const [fetchedUser] = useAxios<User>('/api/auth/me');

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  return <userContext.Provider value={[user, setUser]}>{children}</userContext.Provider>;
};

export const useUser = () => useContext(userContext)[0];
export const useSetUser = () => useContext(userContext)[1];
