import React from 'react';

import { Box, Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import Link from '../Link';

import { Form } from './types';

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
        <Link focusHighlightColor color={false} to={loginSignupLocation()}>
          {form === 'login' ? 'Créer un compte' : 'Connexion'}
        </Link>
      </Box>

      <Box flex={1} color={false} textAlign="right">
        <Link tabIndex={-1} to={forgotPasswordLocation()}>
          Mot de passe oublié
        </Link>
      </Box>
    </Grid>
  );
};

export default AuthenticationNavigation;
