import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { userFetchMe } from './redux/actions';

import { Header, Footer } from './components';

import Home from './pages/Home';
import Rules from './pages/Rules';
import PageNotFound from './pages/PageNotFound';

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(userFetchMe()),
});

class App extends React.Component {

  async componentDidMount() {
    await this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div>

          <Header />

          <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/rules" component={Rules} />

            <Route component={PageNotFound} />

          </Switch>


          <Footer />

        </div>
      </Router>
    );
  }

}

export default hot(module)(connect(null, mapDispatchToProps)(App));
