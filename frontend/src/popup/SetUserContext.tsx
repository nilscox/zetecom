import { createContext } from 'react';

import { User } from '../types/User';

const SetUserContext = createContext<(user: User) => void | null>(null);

export default SetUserContext;
export const SetUserProvider = SetUserContext.Provider;
export const SetUserConsumer = SetUserContext.Consumer;
