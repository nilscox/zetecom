import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import HeaderLogo from 'src/components/HeaderLogo';
import RouterLink from 'src/components/Link';
import { useCurrentUser } from 'src/contexts/UserContext';

import createTheme from '../theme/createTheme';

import AuthenticatedView from './views/AuthenticatedView';
import AuthenticationView from './views/AuthenticationView';

import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme();

theme.typography.body1 = {
  [theme.breakpoints.up('xs')]: {
    fontSize: '1rem',
  },
};

const Popup: React.FC = () => {
  const user = useCurrentUser();

  return (
    <AsyncContent
      loading={typeof user === 'undefined'}
      content={() => (
        <ThemeProvider theme={theme}>
          <Box padding={3}>

            <RouterLink to="/popup">
              <HeaderLogo />
            </RouterLink>

            <Switch>

              <Route path="/popup/:sign(connexion|inscription|connexion-par-email)" component={AuthenticationView} />
              <Route path="/popup" component={AuthenticatedView} />

              <Route render={() => <Redirect to="/popup" />} />

            </Switch>

          </Box>
        </ThemeProvider>
      )}
    />
  );
};

export default Popup;
