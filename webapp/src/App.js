import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { userFetchMe } from './redux/actions';

import { Header, Footer, Loading } from './components';

import Home from './pages/Home';
import Rules from './pages/Rules';
import { Signin, Signup } from './pages/Auth';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

const mapStateToProps = state => ({
  user: state.user,
  loadingUser: state.loading.user,
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(userFetchMe()),
});

class App extends React.Component {

  async componentDidMount() {
    await this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div className="container">

          <Header />

          { this.props.loadingUser
              ? <Loading />
              : this.renderRoutes()
          }

          <Footer />

        </div>
      </Router>
    );
  }

  renderRoutes() {
    return (
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/rules" component={Rules} />

        <Route path="/auth/login" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/profile" component={Profile} />

        <Route component={PageNotFound} />

      </Switch>
    );
  }

}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
