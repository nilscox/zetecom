/* eslint-disable simple-import-sort/sort */

import { hot } from 'react-hot-loader/root';

import React, { useEffect } from 'react';

import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import ErrorBoundary from 'src/components/ErrorBoundary';
import ReactGA from 'src/utils/ga';

import Pages from './pages';
import Integration from './pages/integration';
import Popup from './popup';

import { ThemeProvider, CssBaseline } from '@material-ui/core';
import createTheme from './theme/createTheme';

import './App.css';
import { UserProvider } from './contexts/UserContext';
import env from './utils/env';

const TrackPageView: React.FC = () => {
  const location = useLocation();
  const page = [location.pathname, location.search, location.hash].join('');

  useEffect(() => {
    if (env.GOOGLE_ANALYTICS_ID)
      ReactGA.pageview(page);
  }, [page]);

  return null;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <TrackPageView />
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
