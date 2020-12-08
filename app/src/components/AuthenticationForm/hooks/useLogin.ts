import { useEffect } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { useLocation } from 'react-router-dom';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import useAxios from 'src/hooks/use-axios';
import { FormErrorsHandlers } from 'src/hooks/use-form-errors';
import { User } from 'src/types/User';
import track from 'src/utils/track';

import { FormFields } from '../types';

const useLogin = (onAuthenticated: (user: User) => void) => {
  const trackEvent = useTrackEvent();
  const location = useLocation();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/login' };
  const [{ data: user, loading, error, status }, login] = useAxios(opts, { manual: true }, User);

  useEffect(() => {
    const from = /popup/.exec(location.pathname) ? 'Popup' : 'App';

    if (status(200) && user) {
      onAuthenticated(user);
      trackEvent(track.login(from));
    }

    if (status(401)) {
      trackEvent(track.loginFailed(from));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user, onAuthenticated, trackEvent]);

  const handleLogin = (email: string, password: string) => {
    login({ data: { email, password } }).catch(() => {});
  };

  return [handleLogin, { loading, error }] as const;
};

export default useLogin;

export const loginErrorsHandlers: FormErrorsHandlers<AxiosError, FormFields> = [
  {
    email: ({ response: { status, data } }) => {
      if (status === 401 && data.message === 'EMAIL_NOT_VALIDATED') {
        return "Votre adresse email n'a pas été validée, verifiez dans vos spams !";
      }

      if (data.email?.isEmail) {
        return "Format d'adresse email non valide";
      }
    },
  },
  ({ response: { status, data } }) => {
    if (status === 403) {
      return 'Vous êtes déjà connecté.e';
    }

    if (status === 401 && data.message === 'INVALID_CREDENTIALS') {
      return 'Combinaison email / mot de passe non valide';
    }
  },
];
