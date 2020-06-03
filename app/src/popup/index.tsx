import React from 'react';

import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import HeaderLogo from 'src/components/HeaderLogo';
import RouterLink from 'src/components/Link';

import AsyncContent from '../components/AsyncContent';
import { useCurrentUser } from '../hooks/use-user';

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
    background: 'linear-gradient(to top, #eeeeee 0%, #ffffff 8%)',
  },
  container: {
    marginBottom: theme.spacing(4),
  },
}));

const Popup: React.FC = () => {
  const user = useCurrentUser();
  const classes = useStyles();

  return (
    <AsyncContent
      loading={typeof user === 'undefined'}
      content={() => (
        <>
          <RouterLink to="/popup">
            <HeaderLogo className={classes.headerLogo} />
          </RouterLink>

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
        </>
      )}
    />
  );
};

export default Popup;
