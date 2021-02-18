import React, { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { useAuthenticationFormType } from 'src/components/domain/AuthenticationForm/AuthenticationForm';
import useFormErrors from 'src/hooks/useFormErrors';
import getFormErrors from 'src/utils/getFormErrors';

import useEmailLogin, { emailLoginErrorHandlers } from './useEmailLogin';
import useLogin, { loginErrorHandlers } from './useLogin';
import useSignup, { signupErrorHandlers } from './useSignup';

const useUnhandledError = (unhandledError: AxiosError, message: React.ReactNode) => {
  useEffect(() => {
    if (unhandledError) {
      console.warn('unhandled authentication form error', unhandledError);

      toast.error(
        <>
          {message}
          <br />
          Réessayez plus tard !
        </>,
      );
    }
  }, [unhandledError, message]);
};

const fallbackMessages = {
  login: "Quelque chose s'est mal passé...",
  signup: "L'inscription à échouée, nos meilleurs ingénieurs sont sur le coup.",
  emailLogin: "Une erreur s'est produite, l'email n'a pas pu être envoyé.",
};

const useAuthentication = () => {
  const [formType, getForFormType] = useAuthenticationFormType();

  const [, login, onLogin] = useLogin();
  const [, signup, onSignup] = useSignup();
  const [emailLogin, onEmailLogin] = useEmailLogin();

  const loading = [login, signup, emailLogin].map(({ loading }) => loading).some(Boolean);

  const [{ formError, fieldErrors }, { handleError, clearFieldError, clearAllErrors }] = useFormErrors();
  const [unhandledError, setUnhandledError] = useState<AxiosError>();

  useUnhandledError(unhandledError, getForFormType(fallbackMessages));

  useEffect(() => {
    const handlers = getForFormType({
      login: loginErrorHandlers,
      signup: signupErrorHandlers,
      emailLogin: emailLoginErrorHandlers,
    });

    const error = getForFormType({
      login: login.error,
      signup: signup.error,
      emailLogin: emailLogin.error,
    });

    if (!error) {
      return;
    }

    const [formError, fieldErrors, unhandledError] = getFormErrors(error, handlers);

    handleError(formError, fieldErrors);

    if (unhandledError) {
      setUnhandledError(unhandledError);
    }
  }, [login, signup, emailLogin, getForFormType, handleError]);

  return [
    {
      formType,
      loading,
      formError,
      fieldErrors,
      clearFieldError,
      clearAllErrors,
    },
    {
      onLogin,
      onSignup,
      onEmailLogin,
    },
  ] as const;
};

export default useAuthentication;
