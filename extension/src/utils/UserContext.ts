import { createContext, useEffect, useState } from 'react';

import { User, parseUser } from 'src/types/User';
import useAxios from 'src/hooks/use-axios';

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

// TODO: remove this export
export { useCurrentUser } from 'src/hooks/use-user';

export const useUserContext = () => {
  const opts = { url: '/api/auth/me', validateStatus: (s: number) => [200, 403].includes(s) };
  const [{ response, data, error, status }] = useAxios(opts, parseUser);
  const [user, setUser] = useState<User | undefined | null>();

  if (error)
    throw error;

  useEffect(() => {
    if (response) {
      if (status([200, 304]))
        setUser(data);
      else
        setUser(null);
    }
  }, [response, status, data]);

  return [user, setUser] as const;
};
