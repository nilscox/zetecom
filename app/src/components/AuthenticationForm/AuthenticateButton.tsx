import React, { ReactNode, useMemo } from 'react';

import { Grid, makeStyles } from '@material-ui/core';
import { StateValues } from 'react-use-form-state';

import Button from '../Button';

import { Form, FormFields } from './types';

const text: { [key in Form]: string } = {
  login: 'Connexion',
  signup: 'Inscription',
  emailLogin: 'Envoyer',
};

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    fontSize: 18,
    marginTop: spacing(4),
  },
}));

type AuthenticateButtonProps = {
  form: Form;
  loading: boolean;
  values: StateValues<FormFields>;
  fieldErrors: { [F in keyof FormFields]?: ReactNode };
  formError: ReactNode | undefined;
};

const AuthenticateButton: React.FC<AuthenticateButtonProps> = ({
  form,
  loading,
  values,
  fieldErrors,
  formError,
}) => {
  const isValid = useMemo(() => {
    if (typeof formError !== 'undefined' || Object.values(fieldErrors).some(error => typeof error !== 'undefined'))
      return false;

    if (form === 'signup' && !values.didAcceptRules)
      return false;

    const [email, password, nick] = [values.email !== '', values.password !== '', values.nick !== ''];

    if (form === 'login' && (!email || !password))
      return false;

    if (form === 'signup' && (!email || !password || !nick))
      return false;

    if (form === 'emailLogin' && !email)
      return false;

    return true;
  }, [form, values, fieldErrors, formError]);

  const classes = useStyles();

  return (
    <Grid container direction="row" justify="center">
      <Button size="large" type="submit" disabled={!isValid} loading={loading} className={classes.button}>
        { text[form] }
      </Button>
    </Grid>
  );
};

export default AuthenticateButton;
