import React from 'react';

import RouterLink from '../Link';

import { Form } from './types';

import { Box, Grid } from '@material-ui/core';

type AuthenticationNavigationProps = {
  form: Form;
  urlPrefix?: string;
};

const AuthenticationNavigation: React.FC<AuthenticationNavigationProps> = ({ form, urlPrefix }) => {
  return (
    <Grid container>

      <Box flex={1}>
        <RouterLink to={`${urlPrefix}/${form === 'login' ? 'inscription' : 'connexion'}`}>
          { form === 'login' ? 'Créer un compte' : 'Connexion' }
        </RouterLink>
      </Box>

      <Box flex={1} textAlign="right">
        <RouterLink to={`${urlPrefix}/connexion-par-email`}>
          Mot de passe oublié
        </RouterLink>
      </Box>

    </Grid>
  );
};

export default AuthenticationNavigation;
