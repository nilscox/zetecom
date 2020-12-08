import { useEffect } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import useAxios from 'src/hooks/use-axios';
import { FormErrorsHandlers } from 'src/hooks/use-form-errors';
import { User } from 'src/types/User';

import { FormFields } from '../types';

const useSignup = (onAuthenticated: (user: User) => void) => {
  const trackEvent = useTrackEvent();
  const location = useLocation();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/signup' };
  const [{ data: user, loading, error, status }, signup] = useAxios(opts, { manual: true }, User);

  useEffect(() => {
    if (status(201) && user) {
      if (user.requiresEmailValidation) {
        toast.success(`Pour finaliser votre inscription, un email vous a été envoyé à ${user.email}`);
      } else {
        toast.success('Bienvenue ! 🎉');
      }

      onAuthenticated(user);
      trackEvent({
        category: 'Authentication',
        action: 'Signup',
        name: `Signup From ${/popup/.exec(location.pathname) ? 'Popup' : 'App'}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user, onAuthenticated, trackEvent]);

  const handleSignup = (email: string, password: string, nick: string) => {
    signup({ data: { email, password, nick } }).catch(() => {});
  };

  return [handleSignup, { loading, error }] as const;
};

export default useSignup;

export const signupErrorsHandlers: FormErrorsHandlers<AxiosError, FormFields> = [
  {
    nick: ({ response: { status, data } }) => {
      if (status !== 400) {
        return;
      }

      if (data.nick?.minLength) {
        return 'Ce pseudo est trop court.';
      }

      if (data.nick?.maxLength) {
        return 'Ce pseudo est trop long.';
      }

      if (data.message === 'NICK_ALREADY_EXISTS') {
        return 'Ce pseudo est déjà utilisé.';
      }
    },
    email: ({ response: { status, data } }) => {
      if (status !== 400) {
        return;
      }

      if (data.email?.isEmail) {
        return "Format d'adresse email invalide.";
      }

      if (data.message === 'EMAIL_ALREADY_EXISTS') {
        return 'Cette adresse email est déjà utilisée.';
      }
    },
    password: ({ response: { status, data } }) => {
      if (status !== 400) {
        return;
      }

      if (data.password?.minLength) {
        return 'Ce mot de passe est trop court.';
      }

      if (data.password?.maxLength) {
        return 'Ce mot de passe est trop long... :o';
      }

      if (data.message === 'PASSWORD_UNSECURE') {
        return "Ce mot de passe n'est pas assez sécurisé.";
      }
    },
  },
  ({ response: { status } }) => {
    if (status === 403) {
      return 'Vous êtes déjà connecté.e';
    }
  },
];
