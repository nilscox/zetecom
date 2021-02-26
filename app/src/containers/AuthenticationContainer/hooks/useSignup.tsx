import React from 'react';

import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { useSetUser } from 'src/contexts/userContext';
import { HandleError } from 'src/hooks/useFormErrors';
import { User } from 'src/types/User';
import getFormErrors, { FormErrorHandlers } from 'src/utils/getFormErrors';

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

const signup = async (data: { email: string; password: string; nick: string }) => {
  const response = await axios.post<User>('/api/auth/signup', data);

  return response.data;
};

const useSignup = (onAuthenticated: (user: User) => void, handleError: HandleError) => {
  const setUser = useSetUser();

  const { mutate, isLoading: loading } = useMutation(signup, {
    onSuccess: user => {
      if (user.requiresEmailValidation) {
        toast.success(`Pour finaliser votre inscription, un email vous a été envoyé à ${user.email}`);
      } else {
        setUser(user);
        toast.success('Bienvenue ! 🎉');
      }

      onAuthenticated(user);
    },
    onError: error => {
      const [formError, fieldErrors, unhandledError] = getFormErrors(error as AxiosError, signupErrorHandlers);

      handleError(formError, fieldErrors);

      if (unhandledError) {
        // eslint-disable-next-line no-console
        console.warn('unhandled signup form error', unhandledError);

        toast.error(
          <>
            L'inscription à échouée, nos meilleurs ingénieurs sont sur le coup.
            <br />
            Réessayez plus tard !
          </>,
        );
      }
    },
  });

  return [mutate, { loading }] as const;
};

export default useSignup;
