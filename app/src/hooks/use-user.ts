import { useContext } from 'react';

import UserContext from 'src/utils/UserContext';

const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return [user, setUser] as const;
};

export const useCurrentUser = () => {
  const [user] = useUser();
  return user;
};

export default useUser;
