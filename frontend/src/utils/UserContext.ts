import { createContext } from 'react';

import { User } from '../types/User';

const UserContext = createContext<User | null | undefined>(undefined);

export default UserContext;
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
