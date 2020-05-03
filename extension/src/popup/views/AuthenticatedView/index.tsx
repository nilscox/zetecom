import React, { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';

import UserAvatarNick from 'src/components/common/UserAvatarNick';
import useAxios from 'src/hooks/use-axios';
import useUser from 'src/hooks/use-user';

import Button from '../../components/Button';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

const LogoutView: React.FC<RouteComponentProps> = ({ history }) => {
  const [user, setUser] = useUser();
  const classes = useStyles();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/logout' };
  const [{ error, loading, status }, logout] = useAxios(opts, () => undefined, { manual: true });

  if (error)
    throw error;

  useEffect(() => {
    if (status(204)) {
      setUser(null);
      history.push('/popup');
    }
  }, [status, setUser, history]);

  return (
    <div className={classes.container}>

      <div>
        <UserAvatarNick user={user} />
      </div>

      <Typography>
        Email : { user.email }
      </Typography>

      <Typography>
        Inscrit(e) depuis le : { moment(user.created).format('DD MM YYYY') }
      </Typography>

      <Button loading={loading} className={classes.submitButton} onClick={() => logout()}>
        Déconnexion
      </Button>

    </div>
  );
};

export default LogoutView;
