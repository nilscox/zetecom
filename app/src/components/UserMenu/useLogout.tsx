import { useEffect } from 'react';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import track from 'src/utils/track';

const useLogout = (onLoggedOut?: () => void) => {
  const trackEvent = useTrackEvent();

  const [, setUser] = useUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ error, loading, status }, logout] = useAxios({ method: 'POST', url: '/api/auth/logout' }, { manual: true });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (status(204)) {
      setUser(null);
      trackEvent(track.logout('App'));
      onLoggedOut?.();
    }
  }, [status, setUser, onLoggedOut, trackEvent]);

  return logout;
};

export default useLogout;
