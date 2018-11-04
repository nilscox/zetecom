import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import './App.css';

import Home from './pages/Home';
import InfoList from './pages/InfoList';
import Reaction from './pages/Reaction';
import Help from './pages/Help';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import request from './services/request-service';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const res = await request('/api/user');

    if (res.status === 200)
      this.setState({ user: await res.json() });

    this.setState({ loading: false });
  }

  render() {
    const setUser = user => this.setState({ user });

    if (this.state.loading)
      return 'Loading...';

    return (
      <Router>
        <div className="app">

          <Header user={this.state.user} />

          <div className="content">
            <Switch>

              <Route path="/" exact component={Home} />
              <Route path="/information" component={InfoList} />
              <Route path="/information/:slug" component={Reaction} />
              <Route path="/help" component={Help} />

              <Route path="/profile" render={() => (
                <Profile
                  user={this.state.user}
                  setUser={setUser}
                />
              )} />

              <Route path="/signin" render={({ match }) => (
                <Signin
                  variant="signin"
                  user={this.state.user}
                  setUser={setUser}
                />
              )} />

              <Route path="/signup" render={({ match }) => (
                <Signin
                  variant="signup"
                  user={this.state.user}
                  setUser={setUser}
                />
              )} />

              <Route component={NotFound} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }

}

export default App;
