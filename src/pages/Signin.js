import * as React from 'react';
import { Link } from 'react-router-dom';
import './Signin.css';

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      acceptConditions: false,
      displayConditionsWarning: false,
    };
  }

  isSignin() {
    return this.props.match.path === '/signin';
  }

  isSignup() {
    return this.props.match.path === '/signup';
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isSignin())
      this.onSubmitSignin();
    else
      this.onSubmitSignup();
  }

  async onSubmitSignin() {
    const { email, password } = this.state;
    const res = await fetch({
      method: 'POST',
      url: 'http://localhost:4242/api/signin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.status !== 200)
      console.log('error', await res.json());
  }

  async onSubmitSignup() {
    const { email, password, acceptConditions } = this.state;

    if (!acceptConditions) {
      alert('Vous devez accepter les conditions d\'utilisation du site');
      return;
    }

    const res = await fetch({
      method: 'POST',
      url: 'http://localhost:4242/api/signup',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.status !== 200)
      console.log('error', await res.json());
  }

  render() {
    const { match } = this.props;

    const signinClass = 'btn ' + (this.isSignin() ? 'btn-primary' : 'btn-secondary');
    const signupClass = 'btn ' + (this.isSignup() ? 'btn-primary' : 'btn-secondary');

    const buttonLabel = this.isSignin() ? 'Envoyer' : 'Enregistrer';

    return (
      <div className="signin">

        <div className="signin-signup btn-group btn-group-lg">

          <Link to="/signin" className={signinClass}>
            Connexion
          </Link>

          <Link to="/signup" className={signupClass}>
            Créer un compte
          </Link>

        </div>

        <form onSubmit={this.onSubmit.bind(this)}>

          { this.renderFormEmail() }
          { this.renderFormPassword() }
          { this.isSignup() && this.renderFormAcceptConditions() }

          <input type="submit" value={buttonLabel} className="btn btn-primary" />

        </form>

      </div>
    );
  }

  renderFormEmail() {
    return (
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Email" />
      </div>
    );
  }

  renderFormPassword() {
    return (
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" />
      </div>
    );
  }

  renderFormAcceptConditions() {
    return (
      <div className="accept-conditions">

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="accept-conditions"
            value={this.state.acceptConditions}
            onChange={e => this.setState({ acceptConditions: e.target.checked, displayConditionsWarning: true })}
          />
          <label className="form-check-label" htmlFor="accept-conditions">
            Accepter les conditions
          </label>
        </div>

        { this.state.displayConditionsWarning && (       
          <p className="conditions-warning">
            Attention ! Les conditions d'utilisation de ce site sont un peu particulières... Pas de liste interminable
            de règles, mais une petite dixaine seulement. Ces règles sont <strong>très rapides à lire</strong>, et il
            est important que vous en preniez conaissance.
          </p>
        ) }

      </div>
    );
  }

}

export default Signin;
