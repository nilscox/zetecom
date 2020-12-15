import React, { createContext, useCallback, useContext, useEffect } from 'react';

import useAxios from 'src/hooks/use-axios';
import { NotificationsCount } from 'src/types/Notification';

import useLongPolling from '../hooks/useLongPolling';

import { useUser } from './UserContext';

// every minute
const POLL_INTERVAL = 2 * 60_000;

export type NotificationsContextType = {
  count: number;
  refetch: () => void;
};

export const NotificationsContext = createContext<NotificationsContextType>({ count: NaN, refetch: () => {} });

export const useNotifications = () => useContext(NotificationsContext);

const useFetchNotifications = (onUnauthenticated: () => void) => {
  const [result, refetch] = useAxios(
    {
      url: '/api/notification/me/count',
      validateStatus: s => [200, 403].includes(s),
    },
    { manual: true },
    NotificationsCount,
  );

  const { status } = result;

  useEffect(() => {
    if (status(403)) {
      onUnauthenticated();
    }
  }, [status, onUnauthenticated]);

  return [result, refetch] as const;
};

export const NotificationsProvider: React.FC = ({ children }) => {
  const [user, setUser] = useUser();
  const onUnauthenticated = useCallback(() => setUser(null), [setUser]);
  const [{ data }, refetch] = useFetchNotifications(onUnauthenticated);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  useLongPolling(() => {
    if (user) {
      refetch().catch(() => {});
    }
  }, POLL_INTERVAL);

  const value = { count: data?.count || NaN, refetch };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};
