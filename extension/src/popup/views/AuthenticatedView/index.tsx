import React, { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';

import UserAvatarNick from 'src/components/common/UserAvatarNick';
import useAxios from 'src/hooks/use-axios';
import useUser from 'src/hooks/use-user';
import FormGlobalError from 'src/popup/components/FormGlobalError';
import TextField from 'src/popup/components/TextField';

import Button from '../../components/Button';

import useUpdatePassword from './useUpdatePassword';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
  },
  avatarContainer: {
    marginBottom: theme.spacing(2),
  },
  changePassword: {
    textDecoration: 'underline',
    marginTop: theme.spacing(2),
  },
  submitButton: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
}));

const AuthenticatedView: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useUser();
  const [updatePassword, { errors, passwordChanged }] = useUpdatePassword();
  const { fieldErrors, globalError, unhandledError } = errors || {};
  const [password, setPassword] = useState('');
  const [changePassword, setChangePassword] = useState(false);
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
      setChangePassword(false);
    }
  }, [passwordChanged, setPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(password);
  };

  return (
    <div className={classes.container}>

      <div className={classes.avatarContainer}>
        <UserAvatarNick user={user} />
      </div>

      <Typography>
        Email : { user.email }
      </Typography>

      <Typography>
        Inscrit(e) depuis le : { moment(user.created).format('DD MM YYYY') }
      </Typography>

      { changePassword
        ? (
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

            <FormGlobalError error={globalError} />

          </form>
        )
        : <div className={classes.changePassword} onClick={() => setChangePassword(true)}>Changer de mot de passe</div>
      }

      <Button loading={loading} className={classes.submitButton} onClick={() => logout()}>
        Déconnexion
      </Button>

    </div>
  );
};

export default AuthenticatedView;
