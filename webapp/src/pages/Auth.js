import * as React from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { userLogin, userSignup, resetAuthErrors } from 'Redux/actions';

import { FormInput, Button } from 'Components';
import { classList, getErrorMessage } from 'Utils';

const mapStateToProps = state => ({
  user: state.user,
  authLoading: state.loading.userAuth,
  errors: state.errors.auth,
});

const mapDistaptchToProps = dispatch => ({
  userSignin: (user) => dispatch(userLogin(user)),
  userSignup: (user) => dispatch(userSignup(user)),
  resetErrors: () => dispatch(resetAuthErrors()),
});

class Auth extends React.Component {

  state = {
    email: '',
    password: '',
    nick: '',
    acceptConditions: false,
    displayConditionsWarning: false,
    displayConditionsError: false,
    redirect: false,
  };

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

    this.props.resetErrors();

    const { response } = this.isSignup()
      ? await this.onSubmitSignup()
      : await this.onSubmitSignin();

    if (response.ok)
      this.setState({ redirect: true });
  }

  async onSubmitSignup() {
    const { acceptConditions, email, password, nick } = this.state;

    if (!acceptConditions) {
      this.setState({ displayConditionsError: true });
      return;
    }

    return await this.props.userSignup({ email, password, nick });
  }

  async onSubmitSignin() {
    const { email, password } = this.state;

    return await this.props.userSignin({ email, password });
  }

  render() {
    if (this.state.redirect)
      return <Redirect to="/profile" />;

    return (
      <div className="d-flex flex-column align-items-center">
        { this.renderSigninSignupButtons() }
        { this.renderForm() }
      </div>
    );
  }

  renderSigninSignupButtons() {
    return (
      <div className="btn-group my-5 btn-group-lg">

        <Link
          to="/auth/login"
          css={styles.button}
          className={classList('btn', this.isSignin() ? 'btn-primary' : 'btn-secondary')}
          onClick={this.props.resetErrors}
        >
          Connexion
        </Link>

        <Link
          to="/auth/signup"
          css={styles.button}
          className={classList('btn', this.isSignup() ? 'btn-primary' : 'btn-secondary')}
          onClick={this.props.resetErrors}
        >
          Créer un compte
        </Link>

      </div>
    );
  }

  renderForm() {
    const { user, authLoading } = this.props;

    return (
      <form css={styles.form} onSubmit={this.onSubmit.bind(this)}>

        { this.renderFormEmail() }
        { this.renderFormPassword() }
        { this.isSignup() && this.renderFormNick() }
        { this.renderFormErrors() }
        { this.isSignup() && this.renderFormAcceptConditions() }

        <Button
          type="submit"
          css={styles.button}
          className={classList('btn', 'btn-primary', user && 'disabled')}
          title={user && 'Vous êtes déjà connecté(e)'}
          loading={authLoading}
        >
          { this.isSignin() ? 'Envoyer' : 'Enregistrer' }
        </Button>

      </form>
    );
  }

  renderFormEmail() {
    return (
      <FormInput
        type="email"
        placeholder="Email"
        value={this.state.email}
        onChange={e => this.setState({ email: e.target.value })}
        error={this.props.errors.fields.email}
      />
    );
  }

  renderFormPassword() {
    return (
      <FormInput
        type="password"
        placeholder="Password"
        value={this.state.password}
        onChange={e => this.setState({ password: e.target.value })}
        error={this.props.errors.fields.password}
      />
    );
  }

  renderFormNick() {
    return (
      <FormInput
        type="text"
        placeholder="Pseudo"
        value={this.state.nick}
        onChange={e => this.setState({ nick: e.target.value })}
        error={this.props.errors.fields.nick}
      />
    );
  }

  renderFormErrors() {
    const { invalidCredentials, emailAlreadyExists } = this.props.errors;

    return (
      <div>
        { invalidCredentials && <div className="text-danger small my-1">{ getErrorMessage('INVALID_CREDENTIALS') }</div>}
        { emailAlreadyExists && <div className="text-danger small my-1">{ getErrorMessage('EMAIL_ALREADY_EXISTS') }</div>}
      </div>
    );
  }

  renderFormAcceptConditions() {
    const { displayConditionsError: error } = this.state;

    return (
      <div className="accept-conditions my-2">

        <div className="form-check">

          <input
            className={classList('form-check-input', error && 'is-invalid')}
            type="checkbox"
            id="accept-conditions"
            value={this.state.acceptConditions}
            onChange={e => this.setState({
              acceptConditions: e.target.checked,
              displayConditionsWarning: true,
              displayConditionsError: !e.target.checked,
            })}
          />

          <label className="form-check-label" htmlFor="accept-conditions">
            Accepter les conditions
          </label>

          <div className="invalid-feedback">
            { error && 'Vous devez accepter les conditions' }
          </div>

        </div>

        { this.state.displayConditionsWarning && (
          <p css={styles.conditionsWarning} className="conditions-warning">
            Attention ! Les conditions d'utilisation de ce site sont un peu particulières... Pas de liste interminable
            de règles, mais une petite dixaine seulement. Ces règles sont <strong>très rapides à lire</strong>, et il
            est important que vous en preniez conaissance pour utiliser le site correctement.
          </p>
        ) }

      </div>
    );
  }

}

const styles = {
  link: css({
    textDecoration: 'none',

    '&:focus': {
      boxShadow: 'none',
    },
  }),

  button: css({
    width: 220,
  }),

  form: css({
    width: 340,
  }),

  conditionsWarning: css({
    fontSize: '0.8em',
  }),
};

export const Signin =
  connect(mapStateToProps, mapDistaptchToProps)
  ((props) => <Auth variant="signin" {...props} />);

export const Signup =
  connect(mapStateToProps, mapDistaptchToProps)
  ((props) => <Auth variant="signup" {...props} />);
