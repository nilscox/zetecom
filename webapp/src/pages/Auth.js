import * as React from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import { userLogin } from 'Redux/actions';
import { userSignup } from 'Redux/actions';

import { FormInput } from 'Components';
import { classList } from 'Utils';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDistaptchToProps = dispatch => ({
  userSignin: (user) => dispatch(userLogin(user)),
  userSignup: (user) => dispatch(userSignup(user)),
});

class Auth extends React.Component {

  state = {
    email: '',
    password: '',
    nick: '',
    acceptConditions: false,
    displayConditionsWarning: false,
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

    if (this.isSignup())
      await this.onSubmitSignup();
    else
      await this.onSubmitSignin();
  }

  async onSubmitSignup() {
    const { acceptConditions, email, password, nick } = this.state;

    if (!acceptConditions) {
      // display error message
      return;
    }

    await this.props.userSignup({ email, password, nick });
  }

  async onSubmitSignin() {
    const { email, password } = this.state;

    await this.props.userSignin({ email, password });
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
          onClick={() => {} /* reset errors */}
        >
          Connexion
        </Link>

        <Link
          to="/auth/signup"
          css={styles.button}
          className={classList('btn', this.isSignup() ? 'btn-primary' : 'btn-secondary')}
          onClick={() => {} /* reset errors */}
        >
          Créer un compte
        </Link>

      </div>
    );
  }

  renderForm() {
    const { user } = this.props;

    return (
      <form css={styles.form} onSubmit={this.onSubmit.bind(this)}>

        { this.renderFormEmail() }
        { this.renderFormPassword() }
        { this.isSignup() && this.renderFormNick() }
        { this.isSignup() && this.renderFormAcceptConditions() }

        <input
          type="submit"
          value={this.isSignin() ? 'Envoyer' : 'Enregistrer'}
          css={styles.button}
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
        error={null /* TODO */}
      />
    );
  }

  renderFormPassword() {
    return (
      <FormInput
        type="password"
        placeholder="Password"
        onChange={e => this.setState({ password: e.target.value })}
        error={null /* TODO */}
      />
    );
  }

  renderFormNick() {
    return (
      <FormInput
        type="text"
        placeholder="Pseudo"
        onChange={e => this.setState({ nick: e.target.value })}
        error={null /* TODO */}
      />
    );
  }

  renderFormAcceptConditions() {
    const error = null;

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
            })}
          />

          <label className="form-check-label" htmlFor="accept-conditions">
            Accepter les conditions
          </label>

          <div className="invalid-feedback">
            { /* ERROR MESSAGE */ }
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
