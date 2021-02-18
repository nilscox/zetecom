import { useEffect } from 'react';

import { useSetUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import { User } from 'src/types/User';
import { FormErrorHandlers } from 'src/utils/getFormErrors';

export const loginErrorHandlers: FormErrorHandlers = {
  400: {
    email: {
      isEmail: ['email', "Format d'adresse email non valide"],
    },
  },
  401: ({ message }) => {
    if (message === 'INVALID_CREDENTIALS') {
      return 'Combinaison email / mot de passe non valide';
    }

    if (message === 'EMAIL_NOT_VALIDATED') {
      return "Votre adresse email n'a pas été validée, verifiez dans vos spams !";
    }
  },
  403: 'Vous êtes déjà connecté.e',
};

const useLogin = () => {
  const setUser = useSetUser();

  const result = useAxios<User>({ method: 'POST', url: '/api/auth/login' }, { manual: true });
  const [user] = result;

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return result;
};

export default useLogin;
