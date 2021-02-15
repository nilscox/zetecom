import React from 'react';

import styled from '@emotion/styled';
import { useFormState } from 'react-use-form-state';

import { size } from 'src/theme';

import AuthenticationFormError from './AuthenticationFormError/AuthenticationFormError';
import AuthenticationMessage from './AuthenticationMessage/AuthenticationMessage';
import AuthenticationNavigation from './AuthenticationNavigation/AuthenticationNavigation';
import AcceptRulesCheckbox from './components/AcceptRulesCheckbox';
import AuthenticationSubmitButton from './components/AuthenticationSubmitButton';
import EmailField from './components/EmailField';
import NickField from './components/NickField';
import PasswordField from './components/PasswordField';

export type AuthenticationFormType = 'signup' | 'login' | 'emailLogin';

type AuthenticationForm = {
  email: string;
  password?: string;
  nick?: string;
  didAcceptRules?: boolean;
};

type AuthenticationFormField = keyof AuthenticationForm;

const Form = styled.div`
  max-width: ${size('large')};
  display: flex;
  flex-direction: column;
`;

type AuthenticationFormProps = {
  type: AuthenticationFormType;
  fieldErrors: Partial<Record<AuthenticationFormField, React.ReactNode>>;
  formError?: React.ReactNode;
  onSubmit: (email: string, password?: string, nick?: string) => void;
};

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({ type, fieldErrors, formError, onSubmit }) => {
  const [form, { email, password, text, checkbox }] = useFormState<AuthenticationForm>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, nick } = form.values;

    onSubmit(email, password, nick);
  };

  return (
    <Form as="form" onSubmit={handleSubmit}>
      <AuthenticationMessage formType={type} />
      <EmailField placeholder="Adresse email" error={fieldErrors.email} {...email('email')} />
      <PasswordField
        display={type !== 'emailLogin'}
        placeholder="Mot de passe"
        error={fieldErrors.password}
        {...password('password')}
      />
      <NickField display={type === 'signup'} placeholder="Pseudo" error={fieldErrors.nick} {...text('nick')} />
      <AuthenticationNavigation formType={type} />
      <AcceptRulesCheckbox display={type === 'signup'} {...checkbox('didAcceptRules')} />
      {formError && <AuthenticationFormError error={formError} />}
      <AuthenticationSubmitButton formType={type} />
    </Form>
  );
};

export default AuthenticationForm;
