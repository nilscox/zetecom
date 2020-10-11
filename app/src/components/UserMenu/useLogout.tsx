import { useEffect } from 'react';

import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { trackLogout } from 'src/utils/track';

const useLogout = (onLoggedOut?: () => void) => {
  const [, setUser] = useUser();
  const [{ error, loading, status }, logout] = useAxios({ method: 'POST', url: '/api/auth/logout' }, { manual: true });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (status(204)) {
      setUser(null);
      trackLogout('app');
      onLoggedOut?.();
    }
  }, [status, setUser, onLoggedOut]);

  return logout;
};

export default useLogout;
