import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import './App.css';

import Home from './pages/Home';
import InfoList from './pages/InfoList';
import Reaction from './pages/Reaction';
import Help from './pages/Help';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';

const App = () => (
  <Router>
    <div className="app">

      <Header />

      <div className="content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/information" component={InfoList} />
          <Route path="/information/:slug" component={Reaction} />
          <Route path="/help" component={Help} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signin} />
          <Route component={NotFound} />
        </Switch>
      </div>

    </div>
  </Router>
);

export default App;
