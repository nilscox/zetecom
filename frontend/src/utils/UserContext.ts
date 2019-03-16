import { createContext } from 'react';

const UserContext = createContext(null);

export default UserContext;
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
