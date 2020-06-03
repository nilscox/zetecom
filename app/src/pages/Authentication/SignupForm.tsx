/* eslint-disable max-lines */

import React, { useEffect, useState } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import Flex from 'src/components/Flex';
import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
// TODO: make it common
import { FieldErrorsHandler, GlobalErrorHandler, useFormErrors } from 'src/popup/components/Form';
import WebsiteLink from 'src/popup/components/WebsiteLink';
import { parseUser } from 'src/types/User';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// TODO: export from popup ? make it common ?
const getGlobalError: GlobalErrorHandler = (error: AxiosError) => {
  if (!error || !error.response)
    return;

  const { response: { status, data: { message } } } = error;

  if (status === 401 && message === 'EMAIL_NOT_AUTHORIZED') {
    return (
      <>
        Les inscriptions ne sont pas encore ouvertes.<br />
        Si vous souhaitez participer à la beta,{' '}
        <WebsiteLink to="/faq.html">contactez nous</WebsiteLink> pour
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
  marginTop: {
    marginTop: theme.spacing(2),
  },
  checkboxGroup: {
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  button: {
    fontWeight: 'bold',
  },
  globalError: {
    textAlign: 'center',
  },
}));

const Signup: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  const history = useHistory();
  const [, setUser] = useUser();
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

      <Flex flexDirection="column" alignItems="center">

        <TextField
          fullWidth
          required
          type="email"
          label="Email"
          variant="outlined"
          margin="dense"
          value={email}
          error={!!errors.email}
          helperText={errors.email}
          className={classes.marginTop}
          onChange={(e) => {
            resetErrors();
            setEmail(e.target.value);
          }}
        />

        <TextField
          fullWidth
          required
          type="text"
          label="Pseudo"
          variant="outlined"
          margin="dense"
          value={nick}
          error={!!errors.nick}
          helperText={errors.nick}
          className={classes.marginTop}
          onChange={(e) => {
            resetErrors();
            setNick(e.target.value);
          }}
        />

        <TextField
          fullWidth
          required
          type="password"
          label="Mot de passe"
          variant="outlined"
          margin="dense"
          value={password}
          error={!!errors.password}
          helperText={errors.password}
          className={classes.marginTop}
          onChange={(e) => {
            resetErrors();
            setPassword(e.target.value);
          }}
        />

        <FormGroup row className={clsx(classes.checkboxGroup, classes.marginTop)}>
          <Checkbox
            checked={checked}
            required
            onChange={(e) => setChecked(e.target.checked)}
            value={checked}
          />
          <FormLabel>J'accepte la charte</FormLabel>
        </FormGroup>

        { globalError && (
          <FormHelperText error className={clsx(classes.globalError, classes.marginTop)}>
            { globalError }
          </FormHelperText>
        ) }

        { loading
          ? <CircularProgress size={24} color="secondary" className={classes.marginTop} />
          : (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={clsx(classes.button, classes.marginTop)}
              disabled={!valid}
            >
              Inscription
            </Button>
          )
        }

      </Flex>

    </form>
  );
};

export default Signup;
