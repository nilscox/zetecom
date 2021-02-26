import { useAuthenticationFormType } from 'src/components/domain/AuthenticationForm/AuthenticationForm';
import useFormErrors from 'src/hooks/useFormErrors';

import useEmailLogin from './useEmailLogin';
import useLogin from './useLogin';
import useSignup from './useSignup';

const useAuthentication = (onAuthenticated: () => void) => {
  const [formType, getForFormType] = useAuthenticationFormType();

  const [{ formError, fieldErrors }, { handleError, clearFieldError, clearAllErrors }] = useFormErrors();

  const [onLogin, login] = useLogin(onAuthenticated, handleError);
  const [onSignup, signup] = useSignup(onAuthenticated, handleError);
  const [onEmailLogin, emailLogin] = useEmailLogin(handleError);

  const { loading } = getForFormType({ login, signup, emailLogin });

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
