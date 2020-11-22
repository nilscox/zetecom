import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import { Redirect } from 'react-router-dom';

import Button from 'src/components/Button';
import { UserAvatarNick } from 'src/components/UserAvatar';
import { useCurrentUser } from 'src/contexts/UserContext';
import ChangePasswordField from 'src/popup/views/AuthenticatedView/ChangePasswordField';

import useLogout from './useLogout';
import IntegrationState from 'src/popup/views/AuthenticatedView/IntegrationState';

const useStyles = makeStyles(theme => ({
  logoutButton: {
    fontSize: 18,
  },
  separator: {
    margin: theme.spacing(2, 0),
    border: 0,
    borderBottom: `1px solid ${theme.palette.border.main}`,
  },
}));

const Separator: React.FC = () => {
  const classes = useStyles();

  return (
    <hr className={classes.separator} />
  );
};

const AuthenticatedView: React.FC = () => {
  const user = useCurrentUser();
  const [{ loading }, logout] = useLogout();
  const classes = useStyles();

  // TODO: <Authenticated />
  if (!user) {
    return <Redirect to="/popup/connexion" />;
  }

  return (
    <>
      <Separator />

      <Box marginTop={2} paddingY={2}>
        <UserAvatarNick user={user} />
      </Box>

      <Typography>Email : {user.email}</Typography>
      <Typography>Inscrit(e) depuis le : {dayjs(user.signupDate).format('DD MM YYYY')}</Typography>

      <Box paddingY={2}>
        <ChangePasswordField />
      </Box>

      <Separator />

      <IntegrationState />

      <Separator />

      <Box paddingTop={4} display="flex" justifyContent="center">
        <Button loading={loading} className={classes.logoutButton} onClick={() => logout()}>
          Déconnexion
        </Button>
      </Box>
    </>
  );
};

export default AuthenticatedView;
