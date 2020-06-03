import { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';

import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { parseUser } from 'src/types/User';

import { createFormErrorsHandler } from '../../utils/createFormErrorsHandler';

const useLoginErrors = createFormErrorsHandler({
  email: ({ response: { status, data } }) => {
    if (status === 401 && data.message === 'EMAIL_NOT_VALIDATED')
      return 'Votre adresse email n\'a pas été validée, verifiez dans vos spams !';

    if (data.email?.isEmail)
      return 'Format d\'adresse email non valide';
  },
}, ({ response: { status, data } }) => {
  if (status === 401 && data.message === 'INVALID_CREDENTIALS')
    return 'Combinaison email / mot de passe non valide';
});

const useLogin = () => {
  const history = useHistory();
  const [, setUser] = useUser();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/login' };
  const [{ data: user, loading, error, status }, login] = useAxios(opts, parseUser, { manual: true });

  const errors = useLoginErrors(error);

  useEffect(() => {
    if (status(200)) {
      setUser(user);
      history.push('/popup/authenticated');
    }
  }, [status, user, setUser, history]);

  const handleLogin = (email: string, password: string) => {
    login({ data: { email, password } });
  };

  return [
    handleLogin,
    { loading, errors },
  ] as const;
};

export default useLogin;
