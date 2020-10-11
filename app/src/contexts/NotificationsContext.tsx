import React, { createContext, useContext, useEffect } from 'react';

import useAxios from 'src/hooks/use-axios';
import { NotificationsCount } from 'src/types/Notification';
import env from 'src/utils/env';

import { useCurrentUser } from './UserContext';

// every minute
const POLL_INTERVAL = 60 * 1000;

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

const useLongPolling = (fetch: () => void, ms: number) => {
  const user = useCurrentUser();

  useEffect(() => {
    const interval = setInterval(() => {
      if (fetch) {
        fetch();
      }
    }, ms);

    return () => clearInterval(interval);
  }, [user, fetch, ms]);
};

export const NotificationsProvider: React.FC = ({ children }) => {
  const [{ data }, refetch] = useFetchNotifications();

  // resolved to a constant value after webpack's transform
  if (env.NODE_ENV === 'development') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLongPolling(() => void refetch(), POLL_INTERVAL);
  }

  const value = { count: data?.count || NaN, refetch };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
