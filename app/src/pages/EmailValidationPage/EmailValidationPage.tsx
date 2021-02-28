import React, { useEffect } from 'react';

import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { RouteComponentProps, useHistory } from 'react-router';
import { toast } from 'react-toastify';

import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import { useTrackEvent } from 'src/contexts/trackingContext';
import { useSetUser } from 'src/contexts/userContext';
import track from 'src/domain/track';
import { User } from 'src/types/User';
import getFormErrors, { FormErrorHandlers } from 'src/utils/getFormErrors';

const errorHandlers: FormErrorHandlers = {
  403: 'Vous ne pouvez pas valider votre adresse email lorsque vous êtes connecté.e.',
  400: ({ message }: { message: string }) => {
    if (message === 'USER_EMAIL_TOKEN_NOT_FOUND') {
      return "Le lien que vous avez utilisé n'est pas valide.";
    } else if (message === 'EMAIL_ALREADY_VALIDATED') {
      return 'Votre adresse email a déjà été validée.';
    }
  },
};

const validateEmail = async (token: string) => {
  const response = await axios.post<User>(`/api/auth/validate-email/${token}`);

  return response.data;
};

const useValidateEmail = (token: string) => {
  const setUser = useSetUser();
  const trackEvent = useTrackEvent();
  const history = useHistory();

  const { mutate, isLoading: validatingEmail } = useMutation(() => validateEmail(token), {
    onSuccess: user => {
      setUser(user);
      trackEvent(track.emailValidated());
      toast.success('Votre adresse email a été validée ! 🎉');
    },
    onError: (error: AxiosError) => {
      const [formError] = getFormErrors(error, errorHandlers);

      if (formError) {
        toast.error(formError);
      } else {
        // eslint-disable-next-line no-console
        console.warn('unhandled signup form error', error);

        toast.error("Quelque chose s'est mal passé, votre adresse email n'a pas pu être validée.");
      }
    },
    onSettled: () => {
      history.push('/');
    },
  });

  return [mutate, { validatingEmail }] as const;
};

const EmailValidationPage: React.FC<RouteComponentProps<{ token: string }>> = ({ match }) => {
  const { token } = match.params;

  const [validateEmail, { validatingEmail }] = useValidateEmail(token);

  useEffect(() => {
    validateEmail();
  }, [validateEmail]);

  return <AsyncContent loading={validatingEmail} render={() => null} />;
};

export default EmailValidationPage;
