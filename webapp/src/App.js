import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { fetchUser } from './redux/actions';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser),
});

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return 'hello';
  }

}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
