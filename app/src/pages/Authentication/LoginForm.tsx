import React, { useEffect, useState } from 'react';

import { AxiosError, AxiosRequestConfig } from 'axios';
import clsx from 'clsx';
import { Redirect, useHistory } from 'react-router-dom';

import Flex from 'src/components/Flex';
import useAxios from 'src/hooks/use-axios';
import useUser from 'src/hooks/use-user';
// TODO: make it common ?
import { FieldErrorsHandler, GlobalErrorHandler, useFormErrors } from 'src/popup/components/Form';
import { parseUser } from 'src/types/User';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// TODO: make it common ?
const getGlobalError: GlobalErrorHandler = (error: AxiosError) => {
  if (!error || !error.response)
    return;

  const { response: { status, data: { message } } } = error;

  if (status === 401 && message === 'INVALID_CREDENTIALS')
    return 'Combinaison email / mot de passe non valide';

  if (status === 401 && message === 'EMAIL_NOT_VALIDATED')
    return 'Votre adresse email n\'a pas été validée, verifiez dans vos spams !';
};

// TODO: make it common ?
const getFieldErrors: FieldErrorsHandler = (error: AxiosError) => {
  if (!error || !error.response || error.response.status !== 400)
    return;

  const fields = error.response.data;

  const getErrorMessage = (field: string, obj: { [key: string]: string }) => {
    const constraint = Object.keys(obj)[0];

    if (field === 'email' && constraint === 'isEmail')
      return 'Format d\'adresse email non valide';
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
  globalError: {
    textAlign: 'center',
  },
  button: {
    fontWeight: 'bold',
  },
}));

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  const [currentUser, setUser] = useUser();
  const history = useHistory();
  const classes = useStyles({});

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/login' };
  const [{ data: user, loading, error, status }, login] = useAxios(opts, parseUser, { manual: true });

  const [globalError, errors = {}, resetErrors] = useFormErrors(error, getGlobalError, getFieldErrors);

  useEffect(() => {
    if (status(200)) {
      setUser(user);
      history.push('/');
    }
  }, [status, user, setUser, history]);

  useEffect(() => void setValid(![email, password].some((value) => value.length <= 0)), [email, password]);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    login({
      data: {
        email,
        password,
      },
    });
  };

  if (currentUser)
    return <Redirect to="/" />;

  return (
    <form data-testid="login-form" onSubmit={onSubmit}>
      <Flex flexDirection="column" alignItems="center">

        <TextField
          id="email"
          className={classes.marginTop}
          fullWidth
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
          id="password"
          className={classes.marginTop}
          fullWidth
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

        { globalError && (
          <FormHelperText error className={clsx(classes.globalError, classes.marginTop)}>
            { globalError }
          </FormHelperText>
        ) }

        { loading
          ? <CircularProgress color="secondary" size={24} className={classes.marginTop} />
          : (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={clsx(classes.button, classes.marginTop)}
              disabled={!valid}
            >
              Connexion
            </Button>
          )
        }

      </Flex>
    </form>
  );
};

export default LoginForm;
