import React from 'react';

import styled from '@emotion/styled';

import { ExternalLink } from 'src/components/elements/Link/Link';
import { spacing } from 'src/theme';
import env from 'src/utils/env';

import { AuthenticationFormType } from '../AuthenticationForm';

const messages: Record<AuthenticationFormType, React.ReactNode> = {
  login: (
    <>
      Connectez-vous sur <ExternalLink href={env.WEBSITE_URL}>Zétécom</ExternalLink> pour interagir avec le reste de la
      communauté.
    </>
  ),

  signup: (
    <>
      Créez votre compte sur Zétécom. Vos{' '}
      <ExternalLink href={`${env.WEBSITE_URL}/faq.html#donnees-personnelles`}>données personnelles</ExternalLink> ne
      seront pas communiquées en dehors de la plateforme.
    </>
  ),

  emailLogin: <>Identifiez-vous sur Zétécom via un email contenant un lien de connexion sans mot de passe.</>,
};

const StyledAuthenticationMessage = styled.p`
  margin-bottom: ${spacing(4)};
`;

type AuthenticationMessageProps = {
  formType: AuthenticationFormType;
};

const AuthenticationMessage: React.FC<AuthenticationMessageProps> = ({ formType }) => (
  <StyledAuthenticationMessage>{messages[formType]}</StyledAuthenticationMessage>
);

export default AuthenticationMessage;
