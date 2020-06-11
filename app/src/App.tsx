/* eslint-disable simple-import-sort/sort */

import { hot } from 'react-hot-loader/root';

import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import ErrorBoundary from 'src/components/ErrorBoundary';

import Pages from './pages';
import EmailLogin from './EmailLogin';
import Integration from './pages/integration';
import Popup from './popup';

import { ThemeProvider, CssBaseline } from '@material-ui/core';
import createTheme from './theme/createTheme';

import './App.css';
import { UserProvider } from './contexts/UserContext';

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
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <CssBaseline />
          <Router />
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default hot(App);
