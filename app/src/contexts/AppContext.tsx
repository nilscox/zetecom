import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { Information } from '../types/Information';
import { User } from '../types/User';

import { useUserContext } from './UserContext';

type AppContextType = {
  information: Information;
  setInformation: Dispatch<SetStateAction<Information>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  notifications: { count: number };
  setNotifications: Dispatch<SetStateAction<{ count: number }>>;
};

const AppContext = createContext<AppContextType>(null);

type AppContextProps = {
  value?: Partial<AppContextType>;
}

export const AppContextProvider: React.FC<AppContextProps> = ({ value: providedValue, children }) => {
  const [information, setInformation] = useState<Information>();
  const [user, setUser] = useUserContext();
  const [notifications, setNotifications] = useState<{ count: number }>();

  const value = {
    information,
    setInformation,
    user,
    setUser,
    notifications,
    setNotifications,
  };

  return (
    <AppContext.Provider value={providedValue as AppContextType || value}>
      { children }
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
