import React, { createContext, useContext } from 'react';

import {
  InformationContextType,
  useInformationContext,
} from './InformationContext';
import {
  NotificationsContextType,
  useNotificationsContext,
} from './NotificationsContext';
import { UserContextType, useUserContext } from './UserContext';

export type AppContextType = {
  user: UserContextType;
  information: InformationContextType;
  notifications: NotificationsContextType;
};

const AppContext = createContext<AppContextType>(null);
export default AppContext;

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const value = {
    information: useInformationContext(),
    user: useUserContext(),
    notifications: useNotificationsContext(),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const AppContextProviderTesting: React.FC<Partial<AppContextType>> = ({
  children,
  ...value
}) => {
  return (
    <AppContext.Provider value={value as AppContextType}>
      {children}
    </AppContext.Provider>
  );
};
