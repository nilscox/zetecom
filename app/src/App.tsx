/* eslint-disable simple-import-sort/sort */

import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import ErrorBoundary from 'src/components/ErrorBoundary';

import Pages from './pages';
import EmailLogin from './EmailLogin';
import Integration from './pages/integration';
import Popup from './popup';

import './App.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { UserProvider, useUserContext } from './utils/UserContext';
import { NotificationsCountProvider } from './dashboard/contexts/NotificationsCountContext';
import { createTheme } from './pages/integration/createTheme';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/popup" component={Popup} />
      <Route path="/integration" component={Integration} />
      <Route path="/email-login" component={EmailLogin} />
      <Route component={Pages} />
    </Switch>
  </BrowserRouter>
);

const theme = createTheme();

const App: React.FC = () => {
  const [user, setUser] = useUserContext();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <UserProvider value={{ user, setUser }}>
          <NotificationsCountProvider>
            <Router />
          </NotificationsCountProvider>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
