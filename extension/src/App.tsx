import React from 'react';

import { setConfig } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorBoundary, { DevErrorReporter } from 'src/components/common/ErrorBoundary';

import Dashboard from './dashboard';
import EmailLogin from './EmailLogin';
import Integrations from './integrations';
import Popup from './popup';
import { createTheme } from './utils/createTheme';
import env from './utils/env';

import './App.css';

import { ThemeProvider } from '@material-ui/core/styles';

const { NODE_ENV } = env;

if (NODE_ENV === 'development')
  setConfig({ errorReporter: DevErrorReporter });

const App: React.FC = () => (
  <ThemeProvider theme={createTheme()}>
    <Router>

      <Switch>

        <Route path="/popup" component={Popup} />
        <Route path="/integration" component={Integrations} />
        <Route path="/email-login" component={EmailLogin} />
        <Route component={Dashboard} />

      </Switch>

    </Router>
  </ThemeProvider>
);

const AppWithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default hot(NODE_ENV === 'development' ? App : AppWithErrorBoundary);
