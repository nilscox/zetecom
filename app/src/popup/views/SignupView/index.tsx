import React, { useMemo, useState } from 'react';

import Button from 'src/popup/components/Button';
import FormGlobalError from 'src/popup/components/FormGlobalError';
import TextField from 'src/popup/components/TextField';

import WebsiteLink from '../../components/WebsiteLink';

import AcceptRulesCheckbox from './AcceptRulesCheckbox';
import useSignup from './useSignup';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useForm = () => {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [didAcceptRules, setDidAcceptRules] = useState(false);

  const isValid = useMemo(() => {
    if (nick.length === 0 || email.length === 0 || password.length === 0)
      return false;

    if (!didAcceptRules)
      return false;

    return true;
  }, [nick, email, password, didAcceptRules]);

  return [
    { nick, setNick },
    { email, setEmail },
    { password, setPassword },
    { didAcceptRules, setDidAcceptRules },
    isValid,
  ] as const;
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  submitButton: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const SignupView: React.FC = () => {
  const [
    { nick, setNick },
    { email, setEmail },
    { password, setPassword },
    { didAcceptRules, setDidAcceptRules },
    isValid,
  ] = useForm();

  const [signup, { loading, errors, emailSent }] = useSignup();
  const { globalError, fieldErrors, unhandledError } = errors || {};
  const classes = useStyles();

  if (unhandledError)
    throw unhandledError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(nick, email, password);
  };

  if (emailSent) {
    return (
      <div className={classes.container}>
        <Typography>
          Pour finaliser votre inscription, un email vous a été envoyé à {email}.
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.container}>

      <Typography>
        Créez votre compte sur <WebsiteLink to="/">Réagir à l'information</WebsiteLink>.
      </Typography>

      <Typography>
        Vos <WebsiteLink to="/faq.html#donnees-personnelles">données personnelles</WebsiteLink> ne seront pas
        communiquées en dehors de la plateforme.
      </Typography>

      <form onSubmit={handleSubmit}>

        <TextField
          type="text"
          id="nick"
          name="nick"
          label="Pseudo"
          error={fieldErrors?.nick}
          value={nick}
          onTextChange={setNick}
        />

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
          error={fieldErrors?.password}
          value={password}
          onTextChange={setPassword}
        />

        <AcceptRulesCheckbox checked={didAcceptRules} onChange={setDidAcceptRules} />

        <FormGlobalError error={globalError} />

        <Button type="submit" disabled={!isValid} loading={loading} className={classes.submitButton}>
          Inscription
        </Button>

      </form>

    </div>
  );
};

export default SignupView;
