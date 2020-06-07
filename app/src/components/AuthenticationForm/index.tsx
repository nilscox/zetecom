import React from 'react';

import { RedirectAuthenticated } from 'src/components/Authenticated';
import FormError from 'src/components/FormError';
import { User } from 'src/types/User';

import AuthenticateButton from './AuthenticateButton';
import AuthenticationMessage from './AuthenticationMessage';
import AuthenticationNavigation from './AuthenticationNavigation';
import AcceptRulesCheckbox from './fields/AcceptRulesCheckbox';
import EmailField from './fields/EmailField';
import NickField from './fields/NickField';
import PasswordField from './fields/PasswordField';
import useAuthenticationForm from './hooks/useAuthenticationForm';
import useWhichAuthenticationForm from './hooks/useWhichAuthenticationForm';
import { FormFields } from './types';

type AuthenticationFormProps = {
  urlPrefix?: string;
  formErrorConsistentHeight?: boolean;
  onAuthenticated: (user: User) => void;
};

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  urlPrefix = '',
  formErrorConsistentHeight,
  onAuthenticated,
}) => {
  const form = useWhichAuthenticationForm(urlPrefix);

  const [
    { email, password, text, checkbox },
    { loading, errors: [[fieldErrors, clearFieldError], [formError, clearFormError]] },
    formState,
    authenticate,
  ] = useAuthenticationForm(form, onAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticate();
  };

  const handleChange = (field: keyof FormFields) => () => {
    clearFieldError(field);
    clearFormError();
  };

  const validate = () => true;

  return (
    <form onSubmit={handleSubmit}>

      <RedirectAuthenticated to={urlPrefix} />

      <AuthenticationMessage form={form} />

      <EmailField
        error={fieldErrors.email}
        {...email({ name: 'email', validate, onChange: handleChange('email') })}
      />

      <PasswordField
        form={form}
        error={fieldErrors.password}
        {...password({ name: 'password', validate, onChange: handleChange('password') })}
      />

      <NickField
        form={form}
        error={fieldErrors.nick}
        {...text({ name: 'nick', validate, onChange: handleChange('nick') })}
      />

      <AuthenticationNavigation form={form} urlPrefix={urlPrefix} />

      <AcceptRulesCheckbox form={form} {...checkbox('didAcceptRules')} />

      <FormError error={formError} consistentHeight={formErrorConsistentHeight} />

      <AuthenticateButton
        form={form}
        loading={loading}
        values={formState.values}
        fieldErrors={fieldErrors}
        formError={formError}
      />

    </form>
  );
};

export default AuthenticationForm;
