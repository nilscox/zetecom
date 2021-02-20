import { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { useSetUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import { FormErrorHandlers } from 'src/utils/getFormErrors';

export const emailLoginErrorHandlers: FormErrorHandlers = {
  400: {
    email: {
      isEmail: ['email', "Format d'adresse email non valide"],
    },
  },
  403: 'Vous êtes déjà connecté.e',
};

const useEmailLogin = () => {
  const history = useHistory();
  const setUser = useSetUser();
  const [email, setEmail] = useState<string>();

  const [, response, execute] = useAxios({ method: 'POST', url: '/api/auth/email-login' }, { manual: true });
  const { status } = response;

  useEffect(() => {
    if (status(204) && email) {
      toast.success(`Un email contenant un lien de connexion a bien été envoyé à l'adresse ${email}.`);
      history.push('/connexion');
    }
  }, [status, setUser, history, email]);

  const emailLogin = (config: { data: { email: string } }) => {
    setEmail(config.data.email);
    return execute(config);
  };

  return [response, emailLogin] as const;
};

export default useEmailLogin;
