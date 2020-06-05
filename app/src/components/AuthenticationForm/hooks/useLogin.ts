import { useEffect } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import { FormErrorsHandlers } from 'src/hooks/use-form-errors';
import { parseUser, User } from 'src/types/User';

import { FormFields } from '../types';

const useLogin = (onAuthenticated: (user: User) => void) => {
  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/login' };
  const [{ data: user, loading, error, status }, login] = useAxios(opts, parseUser, { manual: true });

  useEffect(() => {
    if (status(200))
      onAuthenticated(user);
  }, [status, user, onAuthenticated]);

  const handleLogin = (email: string, password: string) => {
    login({ data: { email, password } });
  };

  return [
    handleLogin,
    { loading, error },
  ] as const;
};

export default useLogin;

export const loginErrorsHandlers: FormErrorsHandlers<AxiosError, FormFields> = [
  {
    email: ({ response: { status, data } }) => {
      if (status === 401 && data.message === 'EMAIL_NOT_VALIDATED')
        return 'Votre adresse email n\'a pas été validée, verifiez dans vos spams !';

      if (data.email?.isEmail)
        return 'Format d\'adresse email non valide';
    },
  },
  ({ response: { status, data } }) => {
    if (status === 403)
      return 'Vous êtes déjà connecté.e';

    if (status === 401 && data.message === 'INVALID_CREDENTIALS')
      return 'Combinaison email / mot de passe non valide';
  },
];
