import React, { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import Button from 'src/components/Button';
import FormError from 'src/components/FormError';
import TextField from 'src/components/TextField';
import { UserAvatarNick } from 'src/components/UserAvatar';
import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';

import useChangePassword from './useChangePassword';

import { Box, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ palette }) => ({
  changePassword: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  logoutButton: {
    fontSize: 18,
  },
  passwordChanged: {
    color: palette.success.dark,
  },
}));

const AuthenticatedView: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useUser();
  const [changePassword, { errors, passwordChanged }] = useChangePassword();
  const { fieldErrors, globalError, unhandledError } = errors || {};
  const [password, setPassword] = useState('');
  const [displayChangePasswordForm, setDisplayChangePasswordForm] = useState(false);
  const classes = useStyles();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/logout' };
  const [{ error, loading, status }, logout] = useAxios(opts, () => undefined, { manual: true });

  if (error)
    throw error;

  if (unhandledError)
    throw unhandledError;

  useEffect(() => {
    if (status(204)) {
      setUser(null);
      history.push('/popup');
    }
  }, [status, setUser, history]);

  useEffect(() => {
    if (passwordChanged) {
      setPassword('');
      setDisplayChangePasswordForm(false);
    }
  }, [passwordChanged, setPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword(password);
  };

  if (!user)
    return <Redirect to="/popup/connexion" />;

  return (
    <>

      <Box marginTop={2} paddingY={2}>
        <UserAvatarNick user={user} />
      </Box>

      <Typography>
        Email : { user.email }
      </Typography>

      <Typography>
        Inscrit(e) depuis le : { dayjs(user.created).format('DD MM YYYY') }
      </Typography>

      <Box paddingY={2}>
        <Collapse in={displayChangePasswordForm}>
          <form onSubmit={handleSubmit}>

            <TextField
              type="password"
              id="password"
              name="password"
              label="Nouveau mot de passe"
              error={fieldErrors?.password}
              value={password}
              onTextChange={setPassword}
            />

            <FormError error={globalError} />

          </form>
        </Collapse>

        { passwordChanged ? (
          <Typography className={classes.passwordChanged}>
            Votre mot de passe a bien été mis à jour !
          </Typography>
        ) : (
          <Typography
            className={classes.changePassword}
            onClick={() => setDisplayChangePasswordForm(d => !d)}
          >
            Changer de mot de passe
          </Typography>
        ) }
      </Box>

      <Box paddingTop={4} display="flex" justifyContent="center">
        <Button loading={loading} className={classes.logoutButton} onClick={() => logout()}>
          Déconnexion
        </Button>
      </Box>

    </>
  );
};

export default AuthenticatedView;
