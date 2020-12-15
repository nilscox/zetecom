import React, { createContext, useContext, useEffect } from 'react';

import useAxios from 'src/hooks/use-axios';
import { NotificationsCount } from 'src/types/Notification';

import useLongPolling from '../hooks/useLongPolling';

import { useCurrentUser } from './UserContext';

// every minute
const POLL_INTERVAL = 2 * 1000;

export type NotificationsContextType = {
  count: number;
  refetch: () => void;
};

export const NotificationsContext = createContext<NotificationsContextType>({ count: NaN, refetch: () => {} });

export const useNotifications = () => useContext(NotificationsContext);

const useFetchNotifications = () => {
  const user = useCurrentUser();
  const [result, refetch] = useAxios('/api/notification/me/count', { manual: true }, NotificationsCount);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  return [result, refetch] as const;
};

export const NotificationsProvider: React.FC = ({ children }) => {
  const user = useCurrentUser();
  const [{ data }, refetch] = useFetchNotifications();

  useLongPolling(() => {
    if (user) {
      refetch();
    }
  }, POLL_INTERVAL);

  const value = { count: data?.count || NaN, refetch };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
