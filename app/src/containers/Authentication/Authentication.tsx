import React from 'react';

import AuthenticationForm from 'src/components/domain/AuthenticationForm/AuthenticationForm';
import useAuthentication from 'src/containers/Authentication/hooks/useAuthentication';

type AuthenticationProps = {
  className?: string;
};

const Authentication: React.FC<AuthenticationProps> = ({ className }) => {
  const [
    { formType, loading, formError, fieldErrors, clearFieldError, clearAllErrors },
    { onLogin, onSignup, onEmailLogin },
  ] = useAuthentication();

  const handleSubmit = (email: string, password?: string, nick?: string) => {
    const data = { email, password, nick };

    clearAllErrors();

    if (formType === 'login') {
      onLogin({ data });
    } else if (formType === 'signup') {
      onSignup({ data });
    } else if (formType === 'emailLogin') {
      onEmailLogin({ data });
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
