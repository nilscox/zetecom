/* eslint-disable simple-import-sort/sort */

import { setConfig } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import ErrorBoundary, { DevErrorReporter } from 'src/components/common/ErrorBoundary';

import Dashboard from './dashboard';
import EmailLogin from './EmailLogin';
import Integrations from './integrations';
import Popup from './popup';
import env from './utils/env';

import './App.css';

const { NODE_ENV } = env;

if (NODE_ENV === 'development')
  setConfig({ reloadHooks: false, errorReporter: DevErrorReporter });

const Router: React.FC = () => (
  <BrowserRouter>

    <Switch>

      <Route path="/popup" component={Popup} />
      <Route path="/integration" component={Integrations} />
      <Route path="/email-login" component={EmailLogin} />
      <Route component={Dashboard} />

    </Switch>

  </BrowserRouter>
);

const App: React.FC = () => {
  if (NODE_ENV === 'development')
    return <Router />;

  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default hot(App);
