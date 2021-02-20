import React, { useEffect } from 'react';

import { toast } from 'react-toastify';

import { useAuthenticationFormType } from 'src/components/domain/AuthenticationForm/AuthenticationForm';
import useFormErrors from 'src/hooks/useFormErrors';
import getFormErrors from 'src/utils/getFormErrors';

import useEmailLogin, { emailLoginErrorHandlers } from './useEmailLogin';
import useLogin, { loginErrorHandlers } from './useLogin';
import useSignup, { signupErrorHandlers } from './useSignup';

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

  useEffect(() => {
    const error = getForFormType({
      login: login.error,
      signup: signup.error,
      emailLogin: emailLogin.error,
    });

    if (!error) {
      return;
    }

    const handlers = getForFormType({
      login: loginErrorHandlers,
      signup: signupErrorHandlers,
      emailLogin: emailLoginErrorHandlers,
    });

    const [formError, fieldErrors, unhandledError] = getFormErrors(error, handlers);

    handleError(formError, fieldErrors);

    if (unhandledError) {
      // eslint-disable-next-line no-console
      console.warn('unhandled authentication form error', unhandledError);

      toast.error(
        <>
          {getForFormType(fallbackMessages)}
          <br />
          Réessayez plus tard !
        </>,
      );
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
