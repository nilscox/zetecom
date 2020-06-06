import React from 'react';

import { useLocation } from 'react-router-dom';

import RouterLink from '../Link';

import { Form } from './types';

import { Box, Grid } from '@material-ui/core';

type AuthenticationNavigationProps = {
  form: Form;
  urlPrefix?: string;
};

const AuthenticationNavigation: React.FC<AuthenticationNavigationProps> = ({ form, urlPrefix }) => {
  const { search: queryString } = useLocation();

  const loginSignupLocation = () => {
    const path = form === 'login' ? 'inscription' : 'connexion';

    return `${urlPrefix}/${path}${queryString}`;
  };

  const forgotPasswordLocation = () => {
    return `${urlPrefix}/connexion-par-email${queryString}`;
  };

  return (
    <Grid container>

      <Box flex={1}>
        <RouterLink to={loginSignupLocation()}>
          { form === 'login' ? 'Créer un compte' : 'Connexion' }
        </RouterLink>
      </Box>

      <Box flex={1} textAlign="right">
        <RouterLink to={forgotPasswordLocation()}>
          Mot de passe oublié
        </RouterLink>
      </Box>

    </Grid>
  );
};

export default AuthenticationNavigation;
