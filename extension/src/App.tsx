import React from 'react';

import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorBoundary from 'src/components/common/ErrorBoundary';

import Dashboard from './dashboard';
import Integrations from './integrations';
import Popup from './popup';
import { createTheme } from './utils/createTheme';

import './App.css';

import { ThemeProvider } from '@material-ui/core/styles';

const App: React.FC = () => (
  <ErrorBoundary>
    <ThemeProvider theme={createTheme()}>
      <Router>

        <Switch>

          <Route path="/popup" component={Popup} />
          <Route path="/integration" component={Integrations} />
          <Route component={Dashboard} />

        </Switch>

      </Router>
    </ThemeProvider>
  </ErrorBoundary>
);

export default hot(App);
