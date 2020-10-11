import { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';

import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { trackLogout } from 'src/utils/track';

const useLogout = () => {
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
      history.push('/popup');
      trackLogout('popup');
    }
  }, [status, setUser, history]);

  return [result, logout] as const;
};

export default useLogout;
