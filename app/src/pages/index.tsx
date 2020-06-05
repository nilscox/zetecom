import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router';

import HeaderLogo from 'src/components/HeaderLogo';
import RouterLink from 'src/components/Link';
import Loader from 'src/components/Loader';
import UserMenu from 'src/components/UserMenu';
import { useCurrentUser } from 'src/contexts/UserContext';

import { useNotifications } from '../contexts/NotificationsContext';

import Authentication from './Authentication';
import Information from './Information';
import Informations from './InformationsList';
import NotFound from './NotFound';
import Notifications from './Notifications';
import UserReactions from './UserReactions';

import { Container, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const Router: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Informations} />
    <Route path="/information/:id" component={Information} />
    <Route path="/mes-commentaires" component={UserReactions} />
    <Route path="/:sign(connexion|inscription|connexion-par-email)" component={Authentication} />
    <Route path="/notifications" component={Notifications} />
    <Route component={NotFound} />
  </Switch>
);

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) => ({
  container: {
    [breakpoints.up('sm')]: {
      padding: spacing(0, 6),
    },
    [breakpoints.up('md')]: {
      padding: spacing(0, 12),
    },
    [breakpoints.up('lg')]: {
      padding: spacing(0, 26),
    },
  },
  header: {
    padding: spacing(4, 0),
  },
  userMenu: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

const Pages: React.FC = () => {
  const user = useCurrentUser();
  const classes = useStyles();
  const { refetch: fetchNotifications } = useNotifications();

  useEffect(() => {
    console.log(user);
    if (user)
      fetchNotifications();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Container fixed component="main" className={classes.container}>

      <Grid container className={classes.header}>

        <RouterLink to="/">
          <HeaderLogo />
        </RouterLink>

        <Grid item className={classes.userMenu}>
          <UserMenu user={user} />
        </Grid>

      </Grid>

      { user === undefined ? <Loader /> : <Router />}

    </Container>
  );
};

export default Pages;
