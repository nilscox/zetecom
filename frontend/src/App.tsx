import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ScrollToTop } from 'src/components/common/ScrollToTop';
import ErrorBoundary from 'src/components/common/ErrorBoundary';

import Popup from './popup';
import Integrations from './integrations';
import Pages from './pages';

import './App.css';

const App: React.FC = () => (
  <ErrorBoundary>
    <Router>

      <ScrollToTop />

      <Switch>

        <Route path="/popup" component={Popup} />

        <Route path="/integration" component={Integrations} />

        <Route component={Pages} />

      </Switch>
    </Router>
  </ErrorBoundary>
);

export default hot(App);
