import React from 'react';

import { Route, Switch } from 'react-router';

import Loader from 'src/components/Loader';
import { useCurrentUser } from 'src/utils/UserContext';

import HeaderLogo from '../components/HeaderLogo';

import Authentication from './Authentication';
import Information from './Information';
import Informations from './InformationsList';
import Notifications from './Notifications';
import UserReactions from './UserReactions';

import { Box, Container } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const Router: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Informations} />
    <Route path="/information/:id" component={Information} />
    <Route path="/reactions" component={UserReactions} />
    <Route path="/:sign(connexion|inscription)" component={Authentication} />
    <Route path="/notifications" component={Notifications} />
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
}));

const Pages: React.FC = () => {
  const user = useCurrentUser();
  const classes = useStyles();

  return (
    <Container fixed component="main" className={classes.container}>

      <Box paddingY={4}>
        <HeaderLogo href="/" />
      </Box>

      { user === undefined ? <Loader /> : <Router />}

    </Container>
  );
};

export default Pages;
