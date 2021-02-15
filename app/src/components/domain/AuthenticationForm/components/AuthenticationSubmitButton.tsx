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
};

const AuthenticationSubmitButton: React.FC<AuthenticationSubmitButtonProps> = ({ formType }) => (
  <StyledButton size="large">{labels[formType]}</StyledButton>
);

export default AuthenticationSubmitButton;
