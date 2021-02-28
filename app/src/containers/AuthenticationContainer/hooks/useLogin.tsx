import React from 'react';

import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { useAuthenticationFormType } from 'src/components/domain/AuthenticationForm/AuthenticationForm';
import { useTrackEvent } from 'src/contexts/trackingContext';
import { useSetUser } from 'src/contexts/userContext';
import track from 'src/domain/track';
import { HandleError } from 'src/hooks/useFormErrors';
import { User } from 'src/types/User';
import getFormErrors, { FormErrorHandlers } from 'src/utils/getFormErrors';

const loginErrorHandlers: FormErrorHandlers = {
  400: {
    email: {
      isEmail: ['email', "Format d'adresse email non valide"],
    },
  },
  401: ({ message }: { message?: string }) => {
    if (message === 'INVALID_CREDENTIALS') {
      return 'Combinaison email / mot de passe non valide';
    }

    if (message === 'EMAIL_NOT_VALIDATED') {
      return "Votre adresse email n'a pas été validée, verifiez dans vos spams !";
    }
  },
  403: 'Vous êtes déjà connecté.e',
};

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post<User>('/api/auth/login', credentials);

  return response.data;
};

const useLogin = (onAuthenticated: (user: User) => void, handleError: HandleError) => {
  const setUser = useSetUser();
  const trackEvent = useTrackEvent();
  const [, isPopup] = useAuthenticationFormType();

  const { mutate, isLoading: loading } = useMutation(login, {
    onSuccess: user => {
      setUser(user);
      onAuthenticated(user);
      trackEvent(track.login(isPopup ? 'Popup' : 'Integration'));
    },
    onError: (error: AxiosError) => {
      const [formError, fieldErrors, unhandledError] = getFormErrors(error as AxiosError, loginErrorHandlers);

      handleError(formError, fieldErrors);

      if (unhandledError) {
        // eslint-disable-next-line no-console
        console.warn('unhandled login form error', unhandledError);

        toast.error(
          <>
            Quelque chose s'est mal passé...
            <br />
            Réessayez plus tard !
          </>,
        );
      }

      if (error.response?.status === 401 && error.response.data.message === 'INVALID_CREDENTIALS') {
        trackEvent(track.loginFailed(isPopup ? 'Popup' : 'Integration'));
      }
    },
  });

  return [mutate, { loading }] as const;
};

export default useLogin;
