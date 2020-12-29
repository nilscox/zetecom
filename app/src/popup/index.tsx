import React from 'react';

import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router-dom';

import AsyncContent from 'src/components/AsyncContent';
import HeaderLogo from 'src/components/HeaderLogo';
import RouterLink from 'src/components/Link';
import ToastContainer from 'src/components/ToastContainer';
import { useCurrentUser } from 'src/contexts/UserContext';
import Separator from 'src/popup/views/Separator';
import createTheme from 'src/theme/createTheme';

import IntegrationState from './IntegrationState';
import AuthenticatedView from './views/AuthenticatedView';
import AuthenticationView from './views/AuthenticationView';

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
      render={() => (
        <ThemeProvider theme={theme}>
          <Box padding={3}>
            <ToastContainer />

            <RouterLink to="/popup">
              <HeaderLogo />
            </RouterLink>

            <Separator />

            <IntegrationState />

            <Separator />

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
