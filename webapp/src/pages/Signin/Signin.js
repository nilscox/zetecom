import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import MyContext from 'MyContext';
import request from 'Services/request-service';
import { getErrorMessage } from 'Services/errors-service';
import { FormInput } from 'Components';
import { classList } from 'utils';

import './Signin.css';

/**

Signin props:
- variant: 'signin' | 'signup'

Signin state:
- email: string
- password: string
- acceptConditions: boolean
- displayConditionsWarning: boolean
- redirect: boolean
- errors: Object

*/

class Signin extends React.Component {

  static contextType = MyContext;

  state = {
    email: '',
    password: '',
    nick: '',
    acceptConditions: false,
    displayConditionsWarning: false,
    redirect: false,
    errors: {},
  };

  isSignin() {
    return this.props.variant === 'signin';
  }

  isSignup() {
    return this.props.variant === 'signup';
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });

    if (this.context.user)
      return;

    const { acceptConditions, email, password, nick } = this.state;
    let url, body = null;

    if (this.isSignin()) {
      url = '/api/auth/signin';
      body = { email, password };
    } else {
      if (!acceptConditions) {
        this.setState({ errors: {  acceptConditions: 'CONDITIONS_MUST_BE_CHECKED' } });
        return;
      }

      url = '/api/auth/signup';
      body = { email, password, nick };
    }

    await request(url, {
      method: 'POST',
      body,
    }, {
      200: json => {
        this.context.setUser(json);
        this.setState({ redirect: true });
      },
      400: json => {
        this.setState({ errors: json });
      },
      401: json => {
        if (json.error === 'INVALID_CREDENTIALS')
          this.setState({ errors: { email: ' ', password: 'INVALID_CREDENTIALS' } });
        else
          this.context.onError(json);
      },
      default: this.context.onError,
    });
  }

  render() {
    if (this.state.redirect)
      return <Redirect to="/profile" />;

    return (
      <div className="signin d-flex flex-column align-items-center">
        { this.renderSigninSignupButtons() }
        { this.renderForm() }
      </div>
    );
  }

  renderSigninSignupButtons() {
    return (
      <div className="signin-signup btn-group my-5 btn-group-lg">

        <Link
          to="/signin"
          className={classList('btn', this.isSignin() ? 'btn-primary' : 'btn-secondary')}
          onClick={() => this.setState({ errors: {} })}
        >
          Connexion
        </Link>

        <Link
          to="/signup"
          className={classList('btn', this.isSignup() ? 'btn-primary' : 'btn-secondary')}
          onClick={() => this.setState({ errors: {} })}
        >
          Créer un compte
        </Link>

      </div>
    );
  }

  renderForm() {
    const { user } = this.context;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>

        { this.renderFormEmail() }
        { this.renderFormPassword() }
        { this.isSignup() && this.renderFormNick() }
        { this.isSignup() && this.renderFormAcceptConditions() }

        <input
          type="submit"
          value={this.isSignin() ? 'Envoyer' : 'Enregistrer'}
          className={classList('btn', 'btn-primary', user && 'disabled')}
          title={user && 'Vous êtes déjà connecté(e)'}
        />

      </form>
    );
  }

  renderFormEmail() {
    return (
      <FormInput
        type="email"
        placeholder="Email"
        onChange={e => this.setState({ email: e.target.value })}
        error={this.state.errors.email}
      />
    );
  }

  renderFormPassword() {
    return (
      <FormInput
        type="password"
        placeholder="Password"
        onChange={e => this.setState({ password: e.target.value })}
        error={this.state.errors.password}
      />
    );
  }

  renderFormNick() {
    return (
      <FormInput
        type="text"
        placeholder="Pseudo"
        onChange={e => this.setState({ nick: e.target.value })}
        error={this.state.errors.nick}
      />
    );
  }

  renderFormAcceptConditions() {
    const { acceptConditions: error } = this.state.errors;

    return (
      <div className="accept-conditions my-2">

        <div className="form-check">

          <input
            className={classList('form-check-input', error && 'is-invalid')}
            type="checkbox"
            value=""
            id="accept-conditions"
            value={this.state.acceptConditions}
            onChange={e => this.setState({
              acceptConditions: e.target.checked,
              displayConditionsWarning: true,
              errors: { ...this.state.errors, acceptConditions: false },
            })}
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
            est important que vous en preniez conaissance pour utiliser le site correctement.
          </p>
        ) }

      </div>
    );
  }

}

export default Signin;
