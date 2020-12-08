import { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import track from 'src/utils/track';

const useLogout = () => {
  const trackEvent = useTrackEvent();

  const [, setUser] = useUser();
  const history = useHistory();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/logout' };
  const [result, logout] = useAxios(opts, { manual: true });
  const { error, status } = result;

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (status(204)) {
      setUser(null);
      trackEvent(track.logout('Popup'));
      history.push('/popup');
    }
  }, [status, setUser, history, trackEvent]);

  return [result, logout] as const;
};

export default useLogout;
