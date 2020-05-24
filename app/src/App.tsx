/* eslint-disable simple-import-sort/sort */

import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'iframe-resizer/js/iframeResizer.contentWindow';

import ErrorBoundary from 'src/components/common/ErrorBoundary';

import Dashboard from './dashboard';
import EmailLogin from './EmailLogin';
import Integrations from './integrations';
import Popup from './popup';

import './App.css';

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
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default App;
