import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import axios from 'axios';
import { useQuery } from 'react-query';

import { useUser } from 'src/contexts/userContext';

type NotificationContext = {
  notificationsCount: number;
  setNotificationsCount: Dispatch<SetStateAction<number>>;
};

const notificationsContext = createContext<NotificationContext | undefined>(undefined);

const fetchNotificationsCount = async () => {
  const response = await axios.get<{ count: number }>('/api/notification/me/count');

  return response.data.count;
};

export const NotificationsProvider: React.FC = ({ children }) => {
  const user = useUser();
  const [notificationsCount, setNotificationsCount] = useState<number>(0);

  useQuery('notificationsCount', fetchNotificationsCount, {
    onSuccess: setNotificationsCount,
    enabled: Boolean(user),
  });

  return (
    <notificationsContext.Provider value={{ notificationsCount, setNotificationsCount }}>
      {children}
    </notificationsContext.Provider>
  );
};

export const useNotificationsCount = () => useContext(notificationsContext)?.notificationsCount;
export const useSetNotificationsCount = () => useContext(notificationsContext)?.setNotificationsCount;
