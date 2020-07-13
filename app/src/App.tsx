/* eslint-disable simple-import-sort/sort */

import { hot } from 'react-hot-loader/root';

import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import createTheme from 'src/theme/createTheme';
import { UserProvider } from 'src/contexts/UserContext';
import ErrorBoundary from 'src/components/ErrorBoundary';
import TrackPageView from 'src/components/TrackPageView';

import Pages from './pages';
import Integration from './pages/integration';
import Popup from './popup';

import { ThemeProvider, CssBaseline } from '@material-ui/core';

import './App.css';

const Router: React.FC = () => (
  <BrowserRouter>
    <TrackPageView shouldTrack={page => !page.startsWith('/integration')} />
    <Switch>
      <Route path="/popup" component={Popup} />
      <Route path="/integration" component={Integration} />
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
