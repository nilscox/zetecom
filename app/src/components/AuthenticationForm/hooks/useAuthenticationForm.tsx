import { useEffect, useMemo } from 'react';

import { useFormState } from 'react-use-form-state';

import useFormErrors from 'src/hooks/use-form-errors';
import { User } from 'src/types/User';

import { Form, FormFields } from '../types';

import useAskEmailLogin, { askEmailLoginErrorsHandlers } from './useAskEmailLogin';
import useLogin, { loginErrorsHandlers } from './useLogin';
import useSignup, { signupErrorsHandlers } from './useSignup';

const useAuthenticationForm = (form: Form, onAuthenticated: (user: User) => void) => {
  const [formState, inputs] = useFormState<FormFields>();

  const [login, loginResult] = useLogin(onAuthenticated);
  const loginErrors = useFormErrors(loginErrorsHandlers, loginResult.error);

  const [signup, signupResult] = useSignup(onAuthenticated);
  const signupErrors = useFormErrors(signupErrorsHandlers, signupResult.error);

  const [askEmailLogin, askEmailLoginResult] = useAskEmailLogin(onAuthenticated);
  const askEmailLoginErrors = useFormErrors(askEmailLoginErrorsHandlers, askEmailLoginResult.error);

  const [{ loading }, errors] = useMemo(() => {
    if (form === 'login')
      return [loginResult, loginErrors];
    else if (form ==='signup')
      return [signupResult, signupErrors];
    else
      return [askEmailLoginResult, askEmailLoginErrors];
  }, [form, loginResult, loginErrors, signupResult, signupErrors, askEmailLoginResult, askEmailLoginErrors]);

  useEffect(() => {
    if (form === 'login') {
      formState.clearField('nick');
      formState.clearField('didAcceptRules');
    } else if (form === 'emailLogin') {
      formState.clearField('nick');
      formState.clearField('password');
      formState.clearField('didAcceptRules');
    }
  }, [form, formState]);

  const authenticate = () => {
    if (form === 'login')
      login(formState.values.email, formState.values.password);
    else if (form === 'signup')
      signup(formState.values.email, formState.values.password, formState.values.nick);
    else
      askEmailLogin(formState.values.email);
  };

  return [
    inputs,
    { loading, errors },
    formState,
    authenticate,
  ] as const;
};

export default useAuthenticationForm;
