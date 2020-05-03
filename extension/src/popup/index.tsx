import React from 'react';

import { Redirect, Route, RouteComponentProps, Switch, useHistory, useLocation, withRouter } from 'react-router-dom';

import ErrorBoundary from 'src/components/common/ErrorBoundary';
import HeaderLogo from 'src/components/common/HeaderLogo';
import RouterLink from 'src/components/common/Link';
import Loader from 'src/components/common/Loader';
import { UserProvider, useUserContext } from 'src/utils/UserContext';

import AuthenticatedView from './views/AuthenticatedView';
import EmailLoginView from './views/EmailLoginView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';

import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const LoginSignupTabs: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Tabs variant="fullWidth" value={location.pathname} onChange={(_e, value) => history.replace(value)}>
      <Tab value="/popup/login" label="Connexion" />
      <Tab value="/popup/signup" label="Inscription" />
    </Tabs>
  );
};

const useStyles = makeStyles(theme => ({
  headerLogo: {
    padding: theme.spacing(1),
    borderBottom: '1px solid #CCC',
  },
  container: {
    marginBottom: theme.spacing(4),
  },
}));

const Popup: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useUserContext();
  const classes = useStyles();

  if (user === undefined)
    return <Loader size="big" />;

  return (
    <UserProvider value={{ user, setUser }}>

      <RouterLink to="/popup">
        <HeaderLogo className={classes.headerLogo} />
      </RouterLink>

      <ErrorBoundary>

        <Route exact path="/popup/(login|signup)">
          <LoginSignupTabs />
        </Route>

        <div className={classes.container}>
          <Switch>

            <Route path="/popup/login" component={LoginView} />
            <Route path="/popup/signup" exact component={SignupView} />
            <Route path="/popup/email-login" component={EmailLoginView} />
            <Route path="/popup/authenticated" component={AuthenticatedView} />

            <Route render={() => <Redirect to={user ? '/popup/authenticated' : '/popup/login'} />} />

          </Switch>
        </div>

      </ErrorBoundary>

    </UserProvider>
  );
};

export default withRouter(Popup);
