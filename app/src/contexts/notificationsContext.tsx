import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import useAxios from 'src/hooks/useAxios';

type NotificationContext = {
  notificationsCount: number;
  setNotificationsCount: Dispatch<SetStateAction<number>>;
};

const notificationsContext = createContext<NotificationContext | undefined>(undefined);

export const NotificationsProvider: React.FC = ({ children }) => {
  const [notificationsCount, setNotificationsCount] = useState<number>(0);

  const [result, { status }] = useAxios<{ count: number }>('/api/notification/me/count');

  useEffect(() => {
    if (status(200) && result) {
      setNotificationsCount(result.count);
    }
  }, [status, result]);

  return (
    <notificationsContext.Provider value={{ notificationsCount, setNotificationsCount }}>
      {children}
    </notificationsContext.Provider>
  );
};

export const useNotificationsCount = () => useContext(notificationsContext)?.notificationsCount;
export const useSetNotificationsCount = () => useContext(notificationsContext)?.setNotificationsCount;
