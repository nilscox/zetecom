import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ErrorBoundary from 'src/components/common/ErrorBoundary';

import Popup from './popup';
import Integrations from './integrations';

import './App.css';

const App: React.FC = () => (
  <ErrorBoundary>
    <Router>

      <Switch>

        <Route path="/popup" component={Popup} />
        <Route path="/integration" component={Integrations} />
        <Route render={() => <></>} />

      </Switch>
    </Router>
  </ErrorBoundary>
);

export default hot(App);
