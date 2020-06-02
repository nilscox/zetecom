import React, { useState } from 'react';

import RouterLink from 'src/components/Link';
import FormGlobalError from 'src/popup/components/FormGlobalError';
import WebsiteLink from 'src/popup/components/WebsiteLink';

import Button from '../../components/Button';
import TextField from '../../components/TextField';

import useLogin from './useLogin';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email.length > 0 && password.length > 0;

  return [
    { email, setEmail },
    { password, setPassword },
    isValid,
  ] as const;
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  forgotPassword: {
    textDecoration: 'underline',
    fontSize: 12,
  },
  submitButton: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const LoginView: React.FC = () => {
  const [{ email, setEmail }, { password, setPassword }, isValid] = useForm();
  const [login, { loading, errors = {} }] = useLogin();
  const { globalError, fieldErrors, unhandledError } = errors;
  const classes = useStyles();

  if (unhandledError)
    throw unhandledError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={classes.container}>

      <Typography>
        Connectez-vous sur <WebsiteLink to="/">Réagir à l'information</WebsiteLink> pour interagir avec le reste de la
        communauté.
      </Typography>

      <RouterLink to="/popup/email-login" className={classes.forgotPassword}>
        Mot de passe oublié ?
      </RouterLink>

      <form onSubmit={handleSubmit}>

        <TextField
          type="email"
          id="email"
          name="email"
          label="Adresse email"
          error={fieldErrors?.email}
          value={email}
          onTextChange={setEmail}
        />

        <TextField
          type="password"
          id="password"
          name="password"
          label="Mot de passe"
          value={password}
          onTextChange={setPassword}
        />

        <FormGlobalError error={globalError} />

        <Button type="submit" disabled={!isValid} loading={loading} className={classes.submitButton}>
          Connexion
        </Button>

      </form>

    </div>
  );
};

export default LoginView;
