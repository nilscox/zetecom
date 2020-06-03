/* eslint-disable simple-import-sort/sort */

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
import { AppContextProvider } from './contexts/AppContext';

import './App.css';

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
        <CssBaseline />

        <AppContextProvider>
          <Router />
        </AppContextProvider>

      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
