import React, { useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import { RouteComponentProps } from 'react-router-dom';

import useAxios from 'src/hooks/use-axios';

import Button from '../../components/Button';
import FormGlobalError from '../../components/FormGlobalError';
import TextField from '../../components/TextField';
import { createFormErrorsHandler } from '../../utils/createFormErrorsHandler';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 22,
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const useAskEmailLoginErrors = createFormErrorsHandler(null, null);

const useAskEmailLogin = () => {
  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/ask-email-login' };
  const [{ loading, error, status }, askEmailLogin] = useAxios(opts, undefined, { manual: true });
  const errors = useAskEmailLoginErrors(error);

  const handleAskEmailLogin = (email: string) => {
    askEmailLogin({
      data: { email },
    });
  };

  return [handleAskEmailLogin, { loading, errors, emailSent: status(204) }] as const;
};

const useForm = () => {
  const [email, setEmail] = useState('');
  const isValid = email.length > 0;

  return [{ email, setEmail }, isValid] as const;
};

const EmailLoginView: React.FC<RouteComponentProps> = () => {
  const [askEmailLogin, { loading, errors, emailSent }] = useAskEmailLogin();
  const { fieldErrors, globalError, unhandledError } = errors || {};
  const [{ email, setEmail }, isValid] = useForm();
  const classes = useStyles();

  if (unhandledError)
    throw unhandledError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askEmailLogin(email);
  };

  return (
    <div className={classes.container}>

      <Typography className={classes.title}>
        Connexion par email
      </Typography>

      { emailSent ? (
        <Typography>L'email de connexion a bien été envoyé à l'adresse { email }.</Typography>
      ) : (
        <>

          <Typography>
            Identifiez-vous sur Réagir à l'information via un email contenant un lien de connexion sans mot de passe.
          </Typography>

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

            <FormGlobalError error={globalError} />

            <Button type="submit" disabled={!isValid} loading={loading} className={classes.submitButton}>
              Envoyer
            </Button>

          </form>

        </>
      ) }
    </div>
  );
};

export default EmailLoginView;
