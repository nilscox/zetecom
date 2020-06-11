import React, { createContext, useContext } from 'react';

import { UserContextType, useUserContext } from './UserContext';

export type AppContextType = {
  user: UserContextType;
};

const AppContext = createContext<AppContextType>(null);
export default AppContext;

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const value = {
    user: useUserContext(),
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
