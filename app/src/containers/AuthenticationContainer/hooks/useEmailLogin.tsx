import React from 'react';

import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { useAuthenticationFormType } from 'src/components/domain/AuthenticationForm/AuthenticationForm';
import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { HandleError } from 'src/hooks/useFormErrors';
import getFormErrors, { FormErrorHandlers } from 'src/utils/getFormErrors';

export const emailLoginErrorHandlers: FormErrorHandlers = {
  400: {
    email: {
      isEmail: ['email', "Format d'adresse email non valide"],
    },
  },
  403: 'Vous êtes déjà connecté.e',
};

const emailLogin = async ({ email }: { email: string }) => {
  await axios.post('/api/auth/ask-email-login', { email });
};

const useEmailLogin = (handleError: HandleError) => {
  const trackEvent = useTrackEvent();
  const [, isPopup] = useAuthenticationFormType();

  const { mutate, isLoading: loading } = useMutation(emailLogin, {
    onSuccess: (_, { email }) => {
      toast.success(`Un email contenant un lien de connexion a bien été envoyé à l'adresse ${email}.`);
      trackEvent(track.askEmailLogin(isPopup ? 'Popup' : 'App'));
    },
    onError: error => {
      const [formError, fieldErrors, unhandledError] = getFormErrors(error as AxiosError, emailLoginErrorHandlers);

      handleError(formError, fieldErrors);

      if (unhandledError) {
        // eslint-disable-next-line no-console
        console.warn('unhandled emailLogin form error', unhandledError);

        toast.error(
          <>
            Une erreur s'est produite, l'email de connexion n'a pas pu être envoyé.
            <br />
            Réessayez plus tard !
          </>,
        );
      }
    },
  });

  return [mutate, { loading }] as const;
};

export default useEmailLogin;
