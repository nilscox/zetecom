import React, { useEffect } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { WebsiteLink } from 'src/components/Link';
import useAxios from 'src/hooks/use-axios';
import { FormErrorsHandlers } from 'src/hooks/use-form-errors';
import { parseUser, User } from 'src/types/User';
import track from 'src/utils/track';

import { FormFields } from '../types';

const useSignup = (onAuthenticated: (user: User) => void) => {
  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/signup' };
  const [{ data: user, loading, error, status }, signup] = useAxios(opts, parseUser, { manual: true });

  useEffect(() => {
    if (status(201)) {
      toast.success(`Pour finaliser votre inscription, un email vous a été envoyé à ${user.email}`);
      onAuthenticated(user);
      track('signup');
    }
  }, [status, user, onAuthenticated]);

  const handleSignup = (email: string, password: string, nick: string) => {
    signup({ data: { email, password, nick } });
  };

  return [
    handleSignup,
    { loading, error },
  ] as const;
};

export default useSignup;

export const signupErrorsHandlers: FormErrorsHandlers<AxiosError, FormFields> = [
  {
    nick: ({ response: { status, data } }) => {
      if (status !== 400)
        return;

      if (data.nick?.minLength)
        return 'Ce pseudo est trop court.';

      if (data.nick?.maxLength)
        return 'Ce pseudo est trop long.';

      if (data.message === 'NICK_ALREADY_EXISTS')
        return 'Ce pseudo est déjà utilisé.';
    },
    email: ({ response: { status, data } }) => {
      if (status === 401 && data.message === 'EMAIL_NOT_AUTHORIZED') {
        return (
          <>
            Les inscriptions ne sont pas encore ouvertes.<br />
            {/* eslint-disable-next-line max-len */}
            Si vous souhaitez participer à la beta, <WebsiteLink to="/faq.html#contact">contactez nous</WebsiteLink> pour autoriser votre adresse email.
          </>
        );
      }

      if (status !== 400)
        return;

      if (data.email?.isEmail)
        return 'Format d\'adresse email invalide.';

      if (data.message === 'EMAIL_ALREADY_EXISTS')
        return 'Cette adresse email est déjà utilisée.';
    },
    password: ({ response: { status, data } }) => {
      if (status !== 400)
        return;

      if (data.password?.minLength)
        return 'Ce mot de passe est trop court.';

      if (data.password?.maxLength)
        return 'Ce mot de passe est trop long... :o';

      if (data.message === 'PASSWORD_UNSECURE')
        return 'Ce mot de passe n\'est pas assez sécurisé.';
    },
  },
  ({ response: { status } }) => {
    if (status === 403)
      return 'Vous êtes déjà connecté.e';
  },
];
