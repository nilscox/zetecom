import * as React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import request from '../services/request-service';
import { getErrorMessage } from '../services/errors-service';
import './Signin.css';

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      acceptConditions: false,
      displayConditionsWarning: false,
      redirect: false,
      errors: null,
    };
  }

  isSignin() {
    return this.props.variant === 'signin';
  }

  isSignup() {
    return this.props.variant === 'signup';
  }

  async onSubmit(e) {
    e.preventDefault();

    if (this.props.user)
      return;

    const { acceptConditions, email, password } = this.state;

    this.setState({ errors: null });

    if (this.isSignup() && !acceptConditions) {
      this.setState({ errors: {  acceptConditions: 'CONDITIONS_MUST_BE_CHECKED' } });
      return;
    }

    const url = '/api/auth/' + (this.isSignin() ? 'signin' : 'signup');
    const res = await request(url, {
      method: 'POST',
      body: { email, password },
    });

    if (res.status === 400)
      this.setState({ errors: await res.json() });
    else if (res.status === 401) {
      const json = await res.json();

      if (json.error === 'INVALID_CREDENTIALS')
        this.setState({ errors: { email: ' ', password: 'INVALID_CREDENTIALS' } });
    } else if (res.status === 200) {
      this.props.setUser(await res.json());
      this.setState({ redirect: true });
    }
  }

  render() {
    const { match } = this.props;

    const signinClass = 'btn ' + (this.isSignin() ? 'btn-primary' : 'btn-secondary');
    const signupClass = 'btn ' + (this.isSignup() ? 'btn-primary' : 'btn-secondary');

    const buttonLabel = this.isSignin() ? 'Envoyer' : 'Enregistrer';

    if (this.state.redirect)
      return <Redirect to="/profile" />;

    return (
      <div className="signin">

        <div className="signin-signup btn-group">

          <Link to="/signin" className={signinClass} onClick={() => this.setState({ errors: null }) }>
            Connexion
          </Link>

          <Link to="/signup" className={signupClass} onClick={() => this.setState({ errors: null }) }>
            Créer un compte
          </Link>

        </div>

        <form onSubmit={this.onSubmit.bind(this)}>

          { this.renderFormEmail() }
          { this.renderFormPassword() }
          { this.isSignup() && this.renderFormAcceptConditions() }

          <input
            type="submit"
            value={buttonLabel}
            className={'btn btn-primary' + (this.props.user ? ' disabled' : '')}
          />

        </form>

      </div>
    );
  }

  renderFormEmail() {
    const { errors } = this.state;
    const error = errors && errors.email;

    return (
      <div className="form-group">
        <input
          type="email"
          className={'form-control' + (error ? ' is-invalid' : '')}
          placeholder="Email"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <div className="invalid-feedback">
          { getErrorMessage(error) }
        </div>
      </div>
    );
  }

  renderFormPassword() {
    const { errors } = this.state;
    const error = errors && errors.password;

    return (
      <div className="form-group">
        <input
          type="password"
          className={'form-control' + (error ? ' is-invalid' : '')}
          placeholder="Password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <div className="invalid-feedback">
          { getErrorMessage(error) }
        </div>
      </div>
    );
  }

  renderFormAcceptConditions() {
    const { errors } = this.state;
    const error = errors && errors.acceptConditions;

    return (
      <div className="accept-conditions">

        <div className="form-check">
          <input
            className={'form-check-input' + (error ? ' is-invalid' : '')}
            type="checkbox"
            value=""
            id="accept-conditions"
            value={this.state.acceptConditions}
            onChange={e => this.setState({ acceptConditions: e.target.checked, displayConditionsWarning: true })}
          />
          <label className="form-check-label" htmlFor="accept-conditions">
            Accepter les conditions
          </label>
          <div className="invalid-feedback">
            { getErrorMessage(error) }
          </div>
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
