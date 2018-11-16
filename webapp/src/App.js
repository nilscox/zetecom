import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import request from './services/request-service';

import Home from './pages/Home';
import InformationList from './pages/InformationList';
import Information from './pages/Information';
import Help from './pages/Help';
import Signin from './pages/Signin';
import Profile from './pages/Profile';

import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import Embed from './components/Embed';

import MyContext from './MyContext';

import './Label.css';

class App extends React.Component {

  state = {
    user: null,
    loading: true,
    error: null,
    isEmbed: false,
  };

  async componentDidMount() {
    await request('/api/user', {}, {
      200: json => this.setState({ user: json }),
      404: () => {},
      default: json => this.onError(json),
    });

    this.setState({ loading: false });
  }

  onError(error) {
    console.log('App: error', error);
    this.setState({ error });
  }

  render() {
    const ctx = {
      isEmbed: this.state.isEmbed,
      user: this.state.user,
      setUser: user => this.setState({ user }),
      onError: this.onError.bind(this),
    };

    return (
      <Router>
        <MyContext.Provider value={ctx}>
          <Switch>
            <Route path="/embed/:youtubeId" render={this.renderEmbed.bind(this)} />
            <Route render={this.renderWebapp.bind(this)} />
          </Switch>
        </MyContext.Provider>
      </Router>
    );
  }

  renderEmbed({ match }) {
    if (!this.state.isEmbed)
      setTimeout(() => this.setState({ isEmbed: true }), 0);

    return <Embed youtubeId={match.params.youtubeId} />;
  }

  renderWebapp() {
    const { loading } = this.state;

    return (
      <div className="container">
        <Header user={!loading && this.state.user} />
        { loading ? <Loading /> : this.renderRoutes() }
        <Footer />
      </div>
    );
  }

  renderRoutes() {
    const { user, error } = this.state;

    if (error)
      return this.renderError(error);

    return (
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/help" component={Help} />

        <Route path="/profile" component={Profile} />

        <Route path="/information" exact component={InformationList} />
        <Route path="/information/:slug" render={({ match }) => <Information slug={match.params.slug} />} />

        <Route path="/signin" render={() => <Signin variant="signin" />} />
        <Route path="/signup" render={() => <Signin variant="signup" />} />

        <Route render={this.renderNotFound.bind(this)} />

      </Switch>
    );
  }

  renderError(error) {
    return (
      <div>
        <h2 className="my-5">Uhu... Une erreur s'est produite. ¯\_( )_/¯</h2>
        <pre className="bg-light text-dark border rounded p-2">{ JSON.stringify(error, 2, 2) }</pre>
        <button type="button" className="btn" onClick={() => this.setState({ error: null })}>DISMISS</button>
      </div>
    );
  }

  renderNotFound() {
    return (
      <div>
        <h2 className="my-5">Oops... Cette page n'existe pas.</h2>
      </div>
    );
  }

}

export default App;
