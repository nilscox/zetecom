import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router';

import ErrorBoundary from 'src/components/ErrorBoundary';
import HeaderLogo from 'src/components/HeaderLogo';
import RouterLink from 'src/components/Link';
import Loader from 'src/components/Loader';
import UserMenu from 'src/components/UserMenu';
import { NotificationsProvider } from 'src/contexts/NotificationsContext';
import { useCurrentUser } from 'src/contexts/UserContext';

import ToastContainer from '../components/ToastContainer';

import Authentication from './Authentication';
import CommentsAreaPage from './CommentsAreaPage';
import CommentsAreasList from './CommentsAreasList';
import EmailLogin from './EmailLogin';
import EmailValidation from './EmailValidation';
import Moderation from './Moderation';
import NotFound from './NotFound';
import Notifications from './Notifications';
import UserComments from './UserComments';

import 'react-toastify/dist/ReactToastify.min.css';

const Router: React.FC = () => (
  <ErrorBoundary>
    <Switch>
      <Route path="/" exact component={CommentsAreasList} />
      <Route path="/commentaires/:id(\d+)" component={CommentsAreaPage} />
      <Route path="/mes-commentaires" component={UserComments} />
      <Route path="/:sign(connexion|inscription|connexion-par-email)" component={Authentication} />
      <Route path="/validation-email/:token" component={EmailValidation} />
      <Route path="/email-login" component={EmailLogin} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/moderation" component={Moderation} />
      <Route component={NotFound} />
    </Switch>
  </ErrorBoundary>
);

const Footer: React.FC = () => <div style={{ minHeight: 69 }} />;

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  container: {
    [breakpoints.up('sm')]: {
      padding: spacing(0),
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
  headerLink: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userMenu: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

const PageContainer: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container fixed component="main" className={classes.container}>
      {children}
    </Container>
  );
};

const Pages: React.FC = () => {
  const user = useCurrentUser();
  const classes = useStyles();

  return (
    <NotificationsProvider>
      <PageContainer>
        <ToastContainer />

        <Grid container className={classes.header}>
          <RouterLink to="/" className={classes.headerLink}>
            <HeaderLogo />
          </RouterLink>

          <Grid item className={classes.userMenu}>
            <UserMenu user={user} />
          </Grid>
        </Grid>

        {user === undefined ? <Loader /> : <Router />}

        <Footer />
      </PageContainer>
    </NotificationsProvider>
  );
};

export default Pages;
