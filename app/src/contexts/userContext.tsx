import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import { User } from 'src/types/User';

type UserContextType = [User | null, (user: User | null) => void];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userContext = createContext<UserContextType>(null as any);

const fetchMe = async () => {
  const response = await axios.get<User>('/api/auth/me', {
    validateStatus: (status: number) => [200, 403].includes(status),
  });

  if (response.status === 403) {
    return null;
  }

  return response.data;
};

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const queryClient = useQueryClient();

  useQuery('me', fetchMe, {
    onSuccess: setUser,
  });

  useEffect(() => {
    queryClient.invalidateQueries('notificationsCount');
  }, [user, queryClient]);

  return (
    <AsyncContent
      loaderDelay={800}
      loading={user === undefined}
      render={() => <userContext.Provider value={[user as User | null, setUser]}>{children}</userContext.Provider>}
    />
  );
};

export const useUser = () => useContext(userContext)[0];
export const useSetUser = () => useContext(userContext)[1];
