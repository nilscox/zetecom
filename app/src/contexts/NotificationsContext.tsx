import React, { createContext, useContext, useEffect, useState } from 'react';

import useAxios from 'src/hooks/use-axios';
import { parseNotificationsCount } from 'src/types/Notification';

import { useCurrentUser } from './UserContext';

export type NotificationsContextType = {
  count: number;
  refetch: () => void;
};

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC = ({ children }) => {
  const user = useCurrentUser();

  const [{ data }, refetch] = useAxios('/api/notification/me/count', parseNotificationsCount, { manual: true });
  const [count, setCount] = useState();

  useEffect(() => {
    if (user)
      refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (typeof data !== 'undefined')
      setCount(data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => void refetch(), 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  const value = { count, refetch };

  return (
    <NotificationsContext.Provider value={value}>
      { children }
    </NotificationsContext.Provider>
  );
};
