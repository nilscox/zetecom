/* eslint-disable max-lines */

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AxiosRequestConfig, AxiosError } from 'axios';

import { makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link } from 'src/components/common/Link';

import useAxios from 'src/hooks/use-axios';
import { parseUser } from 'src/types/User';
import UserContext from 'src/utils/UserContext';
// TODO: make it common
import { useFormErrors, GlobalErrorHandler, FieldErrorsHandler } from 'src/popup/components/Form';

const { WEBSITE_URL } = process.env;

// TODO: export from popup ? make it common ?
const getGlobalError: GlobalErrorHandler = (error: AxiosError) => {
  if (!error || !error.response)
    return;

  const { response: { status, data: { message } } } = error;

  if (status === 401 && message === 'EMAIL_NOT_AUTHORIZED') {
    return (
      <>
        Les inscriptions ne sont pas encore ouvertes.<br />
        Si vous souhaitez participer à la beta,
        <Link openInNewTab href={`${WEBSITE_URL}/faq.html`}>contactez nous</Link> pour
        autoriser votre adresse email.
      </>
    );
  }

  if (status === 400 && message === 'PASSWORD_UNSECURE')
    return 'Ce mot de passe n\'est pas assez sécurisé.';

  if (status === 400 && message === 'NICK_ALREADY_EXISTS')
    return 'Ce pseudo est déjà utilisé.';

  if (status === 400 && message === 'EMAIL_ALREADY_EXISTS')
    return 'Cette adresse email est déjà utilisée.';
};

// TODO: make it common ?
const getFieldErrors: FieldErrorsHandler = (error: AxiosError) => {
  if (!error || !error.response || error.response.status !== 400)
    return;

  const fields = error.response.data;

  const getErrorMessage = (field: string, obj: { [key: string]: string }) => {
    const constraint = Object.keys(obj)[0];

    if (field === 'email' && constraint === 'isEmail')
      return 'Format d\'adresse email invalide.';

    if (field === 'nick' && constraint === 'minLength')
      return 'Ce pseudo est trop court.';

    if (field === 'nick' && constraint === 'maxLength')
      return 'Ce pseudo est trop long.';

    if (field === 'password' && constraint === 'minLength')
      return 'Ce mot de passe est trop court.';

    if (field === 'password' && constraint === 'maxLength')
      return 'Ce mot de passe est trop long... :o';
  };

  return Object.keys(fields)
    .reduce((errors, field) => ({
      [field]: getErrorMessage(field, fields[field]),
      ...errors,
    }), {});
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    '& > div': {
      marginTop: theme.spacing(2),
    },
  },
  checkboxGroup: {
    alignItems: 'center',
  },
  button: {
    fontWeight: 'bold',
  },
  globalError: {
    textAlign: 'center',
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    alignSelf: 'center',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Signup: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const classes = useStyles({});

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/signup' };
  const [{ data: user, loading, error, status }, signup] = useAxios(opts, parseUser, { manual: true });

  const [globalError, errors = {}, resetErrors] = useFormErrors(error, getGlobalError, getFieldErrors);

  useEffect(() => {
    if (status(201)) {
      setUser(user);
      history.push('/');
    }
  }, [status, user, setUser, history]);

  useEffect(() => {
    let isValid = true;

    if ([nick, email, password].some((value) => value.length <= 0))
      isValid = false;

    if (!checked)
      isValid = false;

    setValid(isValid);
  }, [checked, nick, email, password]);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    signup({
      data: {
        email,
        nick,
        password,
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>

      <FormGroup className={classes.container}>
        <TextField
          type="email"
          value={email}
          label="Email"
          required
          variant="outlined"
          margin="dense"
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => {
            resetErrors();
            setEmail(e.target.value);
          }}
        />

        <TextField
          value={nick}
          label="Pseudo"
          required
          variant="outlined"
          margin="dense"
          error={!!errors.nick}
          helperText={errors.nick}
          onChange={(e) => {
            resetErrors();
            setNick(e.target.value);
          }}
        />

        <TextField
          type="password"
          value={password}
          label="Mot de passe"
          required
          variant="outlined"
          margin="dense"
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => {
            resetErrors();
            setPassword(e.target.value);
          }}
        />

        <FormGroup row className={classes.checkboxGroup}>
          <Checkbox
            checked={checked}
            required
            onChange={(e) => setChecked(e.target.checked)} value={checked}
          />
          <FormLabel>J'accepte la charte</FormLabel>
        </FormGroup>

        <FormHelperText error className={classes.globalError}>
          { globalError }
        </FormHelperText>

        <div className={classes.buttonWrapper}>
          <Button type="submit" variant="text" color="secondary" className={classes.button} disabled={!valid}>
            { loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : 'S\'enregistrer' }
          </Button>
        </div>

      </FormGroup>

    </form>
  );
};

export default Signup;
