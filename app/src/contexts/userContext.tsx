import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import useAxios from 'src/hooks/useAxios';
import { User } from 'src/types/User';

type UserContextType = [User | null, (user: User | null) => void];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userContext = createContext<UserContextType>(null as any);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [fetchedUser, { status }] = useAxios<User>('/api/auth/me');

  useEffect(() => {
    if (status(200)) {
      setUser(fetchedUser);
    } else if (status(403)) {
      setUser(null);
    }
  }, [fetchedUser, status]);

  return (
    <AsyncContent
      loaderDelay={800}
      loading={user === undefined}
      render={() => (
        <userContext.Provider value={[user as UserContextType[0], setUser]}>{children}</userContext.Provider>
      )}
    />
  );
};

export const useUser = () => useContext(userContext)[0];
export const useSetUser = () => useContext(userContext)[1];
