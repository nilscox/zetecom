import React from 'react';

import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ErrorBoundary from 'src/components/common/ErrorBoundary';

import Dashboard from './dashboard';
import Integrations from './integrations';
import Popup from './popup';

import './App.css';

const App: React.FC = () => (
  <ErrorBoundary>
    <Router>

      <Switch>

        <Route path="/popup" component={Popup} />
        <Route path="/integration" component={Integrations} />
        <Route component={Dashboard} />

      </Switch>
    </Router>
  </ErrorBoundary>
);

export default hot(App);
