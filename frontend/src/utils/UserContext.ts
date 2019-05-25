import { createContext } from 'react';

import { User } from '../types/User';

type UserContextValue = {
  user: User | null;
  setUser: (user: User) => void;
};

/**
 * The UserContext provides a way to get the current logged in user anywhere in the app.
 * If the user is fetching, then the context value is undefined.
 * Otherwise, it is an object of the type `UserContextValue`, which allows to get or set the
 * current user.
 *
 * @type {UserContextValue} get or set the current user
 */
const UserContext = createContext<UserContextValue | undefined>(undefined);

export default UserContext;
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
