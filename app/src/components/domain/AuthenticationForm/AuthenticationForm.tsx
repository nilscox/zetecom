import React from 'react';

import styled from '@emotion/styled';
import { useFormState } from 'react-use-form-state';

import AuthenticationFormError from './AuthenticationFormError/AuthenticationFormError';
import AuthenticationMessage from './AuthenticationMessage/AuthenticationMessage';
import AuthenticationNavigation from './AuthenticationNavigation/AuthenticationNavigation';
import AcceptRulesCheckbox from './components/AcceptRulesCheckbox';
import AuthenticationSubmitButton from './components/AuthenticationSubmitButton';
import EmailField from './components/EmailField';
import NickField from './components/NickField';
import PasswordField from './components/PasswordField';
import useAuthenticationFormType from './hooks/useAuthenticationFormType';

export { default as useAuthenticationFormType } from './hooks/useAuthenticationFormType';

export type AuthenticationFormType = 'signup' | 'login' | 'emailLogin';

type AuthenticationForm = {
  email: string;
  password?: string;
  nick?: string;
  didAcceptRules?: boolean;
};

export type AuthenticationFormField = keyof AuthenticationForm;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

type AuthenticationFormProps = {
  className?: string;
  loading: boolean;
  fieldErrors: Partial<Record<AuthenticationFormField, React.ReactNode>>;
  formError?: React.ReactNode;
  clearFieldError: (field: string) => void;
  onSubmit: (email: string, password?: string, nick?: string) => void;
};

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  className,
  loading,
  fieldErrors,
  formError,
  clearFieldError,
  onSubmit,
}) => {
  const [formType, isPopup, getForFormType] = useAuthenticationFormType();

  const [form, { email, password, text, checkbox }] = useFormState<AuthenticationForm>(undefined, {
    onChange: e => clearFieldError(e.target.name),
  });

  const isValid = () => {
    const hasValue = (...fields: Array<AuthenticationFormField>) => fields.every(field => form.values[field]);

    return getForFormType({
      login: hasValue('email', 'password'),
      signup: hasValue('email', 'password', 'nick', 'didAcceptRules'),
      emailLogin: hasValue('email'),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, nick } = form.values;

    onSubmit(email, password, nick);
  };

  return (
    <Form as="form" className={className} onSubmit={handleSubmit}>
      <AuthenticationMessage formType={formType} />

      {/* prettier-ignore */}
      <EmailField
        placeholder="Adresse email"
        error={fieldErrors.email}
        {...email('email')}
      />

      <PasswordField
        display={formType !== 'emailLogin'}
        placeholder="Mot de passe"
        error={fieldErrors.password}
        {...password('password')}
      />

      {/* prettier-ignore */}
      <NickField
        display={formType === 'signup'}
        placeholder="Pseudo"
        error={fieldErrors.nick}
        {...text('nick')}
      />

      <AuthenticationNavigation formType={formType} isPopup={isPopup} />

      {/* prettier-ignore */}
      <AcceptRulesCheckbox
        display={formType === 'signup'}
        {...checkbox('didAcceptRules')}
      />

      {formError && <AuthenticationFormError error={formError} />}

      <AuthenticationSubmitButton disabled={!isValid()} loading={loading} formType={formType} />
    </Form>
  );
};

export default AuthenticationForm;
