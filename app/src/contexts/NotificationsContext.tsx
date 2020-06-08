import { useEffect, useState } from 'react';

import useAxios from 'src/hooks/use-axios';
import { parseNotificationsCount } from 'src/types/Notification';

import { useAppContext } from './AppContext';

export type NotificationsContextType = {
  count: number;
  refetch: () => void;
};

export const useNotificationsContext = () => {
  const [{ data }, refetch] = useAxios('/api/notification/me/count', parseNotificationsCount, { manual: true });
  const [count, setCount] = useState();

  useEffect(() => {
    if (typeof data !== 'undefined')
      setCount(data);
  }, [data]);

  // useEffect(() => {
  //   const interval = setInterval(() => void refetch(), 60 * 1000);
  //   return () => clearInterval(interval);
  // }, [refetch]);

  return {
    count,
    refetch,
  };
};

export const useNotifications = () => {
  const { notifications } = useAppContext();

  return notifications;
};
