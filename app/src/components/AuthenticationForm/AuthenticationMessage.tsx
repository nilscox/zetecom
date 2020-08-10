import React from 'react';

import { Box, Typography } from '@material-ui/core';

import { WebsiteLink } from 'src/components/Link';

import { Form } from './types';

/* eslint-disable max-len */
const text: { [key in Form]: React.ReactNode } = {
  login: <>Connectez-vous sur <WebsiteLink to="/">Zétécom</WebsiteLink> pour interagir avec le reste de la communauté.</>,
  signup: <>Créez votre compte sur Zétécom. Vos <WebsiteLink to="/faq.html#donnees-personnelles">données personnelles</WebsiteLink> ne seront pas communiquées en dehors de la plateforme.</>,
  emailLogin: <>Identifiez-vous sur Zétécom via un email contenant un lien de connexion sans mot de passe.</>,
};
/* eslint-enable max-len */

type AuthenticationMessageProps = {
  form: Form;
};

const AuthenticationMessage: React.FC<AuthenticationMessageProps> = ({ form }) => (
  <Box marginBottom={4}>
    <Typography>{ text[form] }</Typography>
  </Box>
);

export default AuthenticationMessage;
