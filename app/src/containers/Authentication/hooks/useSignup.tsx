import { useEffect } from 'react';

import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { useSetUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import { User } from 'src/types/User';
import { FormErrorHandlers } from 'src/utils/getFormErrors';

export const signupErrorHandlers: FormErrorHandlers = {
  400: {
    nick: {
      minLength: ['nick', 'Ce pseudo est trop court.'],
      maxLength: ['nick', 'Ce pseudo est trop long.'],
    },
    email: {
      isEmail: ['email', "Format d'adresse email invalide."],
    },
    password: {
      minLength: ['password', 'Ce mot de passe est trop court.'],
      maxLength: ['password', 'Ce mot de passe est trop long... :o'],
    },
    error: (_, { message }) => {
      switch (message) {
        case 'NICK_ALREADY_EXISTS':
          return ['nick', 'Ce pseudo est déjà utilisé.'];

        case 'EMAIL_ALREADY_EXISTS':
          return ['email', 'Cette adresse email est déjà utilisée.'];

        case 'PASSWORD_UNSECURE':
          return ['password', "Ce mot de passe n'est pas assez sécurisé."];
      }
    },
  },
  403: 'Vous êtes déjà connecté.e',
};

const useSignup = () => {
  const history = useHistory();
  const setUser = useSetUser();

  const result = useAxios<User>({ method: 'POST', url: '/api/auth/signup' }, { manual: true });
  const [user] = result;

  useEffect(() => {
    if (user) {
      if (user.requiresEmailValidation) {
        toast.success(`Pour finaliser votre inscription, un email vous a été envoyé à ${user.email}`);
        history.push('/connexion');
      } else {
        setUser(user);
        toast.success('Bienvenue ! 🎉');
      }
    }
  }, [user, history, setUser]);

  return result;
};

export default useSignup;
