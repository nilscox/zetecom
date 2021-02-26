import React from 'react';

import AuthenticationForm from 'src/components/domain/AuthenticationForm/AuthenticationForm';

import useAuthentication from './hooks/useAuthentication';

type AuthenticationProps = {
  className?: string;
  onAuthenticated: () => void;
};

const Authentication: React.FC<AuthenticationProps> = ({ className, onAuthenticated }) => {
  const [
    { formType, loading, formError, fieldErrors, clearFieldError, clearAllErrors },
    { onLogin, onSignup, onEmailLogin },
  ] = useAuthentication(onAuthenticated);

  const handleSubmit = (email: string, password?: string, nick?: string) => {
    clearAllErrors();

    if (formType === 'login') {
      if (password) {
        onLogin({ email, password });
      }
    } else if (formType === 'signup') {
      if (password && nick) {
        onSignup({ email, password, nick });
      }
    } else if (formType === 'emailLogin') {
      onEmailLogin({ email });
    }
  };

  return (
    <AuthenticationForm
      className={className}
      loading={loading}
      fieldErrors={fieldErrors}
      formError={formError}
      clearFieldError={clearFieldError}
      onSubmit={handleSubmit}
    />
  );
};

export default Authentication;
