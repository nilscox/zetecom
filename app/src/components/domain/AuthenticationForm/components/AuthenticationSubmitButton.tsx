import React from 'react';

import styled from '@emotion/styled';

import Button from 'src/components/elements/Button/Button';
import { spacing } from 'src/theme';

import { AuthenticationFormType } from '../AuthenticationForm';

const labels: Record<AuthenticationFormType, React.ReactNode> = {
  login: 'Connexion',
  signup: 'Inscription',
  emailLogin: 'Envoyer',
};

const StyledButton = styled(Button)`
  margin-top: ${spacing(3)};
  align-self: center;
`;

type AuthenticationSubmitButtonProps = {
  formType: AuthenticationFormType;
  disabled: boolean;
  loading: boolean;
};

const AuthenticationSubmitButton: React.FC<AuthenticationSubmitButtonProps> = ({ formType, disabled, loading }) => (
  <StyledButton disabled={disabled} loading={loading} size="large">
    {labels[formType]}
  </StyledButton>
);

export default AuthenticationSubmitButton;
