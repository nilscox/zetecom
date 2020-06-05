import { useEffect } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import { parseUser, User } from 'src/types/User';

import { FormErrorsHandlers } from '../../../hooks/use-form-errors';
import { FormFields } from '../types';

const useAskEmailLogin = (onAuthenticated: (user: User) => void) => {
  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/ask-email-login' };
  const [{ data: user, loading, error, status }, askEmailLogin] = useAxios(opts, parseUser, { manual: true });

  useEffect(() => {
    if (status(204))
      onAuthenticated(user);
  }, [status, user, onAuthenticated]);

  const handleAskEmailLogin = (email: string) => {
    askEmailLogin({ data: { email } });
  };

  return [
    handleAskEmailLogin,
    { loading, error },
  ] as const;
};

export default useAskEmailLogin;

export const askEmailLoginErrorsHandlers: FormErrorsHandlers<AxiosError, FormFields> = [
  {
    email: ({ response: { status, data } }) => {
      if (status === 400 && data.email?.isEmail)
        return 'Format d\'adresse email non valide';
    },
  },
  ({ response: { status } }) => {
    if (status === 403)
      return 'Vous êtes déjà connecté.e';
  },
];
