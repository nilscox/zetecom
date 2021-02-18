import React from 'react';

import styled from '@emotion/styled';

import Link from 'src/components/elements/Link/Link';

import { AuthenticationFormType } from '../AuthenticationForm';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type AuthenticationNavigationProps = {
  formType: AuthenticationFormType;
};

const AuthenticationNavigation: React.FC<AuthenticationNavigationProps> = ({ formType }) => (
  <Container>
    {formType !== 'login' && <Link to="/connexion">Connexion</Link>}
    {formType === 'login' && <Link to="/inscription">Créer un compte</Link>}
    {formType !== 'emailLogin' && <Link to="/connexion-par-email">Mot de passe oublié</Link>}
  </Container>
);

export default AuthenticationNavigation;
