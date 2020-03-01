import React from 'react';

import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import Loader from 'src/components/common/Loader';
import { UserProvider, useUserContext } from 'src/utils/UserContext';

import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import PasswordResetView from './views/PasswordResetView';
import PostSignupView from './views/PostSignupView';
import SignupView from './views/SignupView';

const Popup: React.FC<RouteComponentProps> = () => {
  const [user, setUser] = useUserContext();

  if (user === undefined)
    return <Loader size="big" />;

  return (
    <UserProvider value={{ user, setUser }}>
      <div style={{ paddingBottom: 15 }}>
        <Switch>

          <Route path="/popup/login" component={LoginView} />
          <Route path="/popup/signup" exact component={SignupView} />
          <Route path="/popup/signup/post-signup" component={PostSignupView} />
          <Route path="/popup/password-reset" component={PasswordResetView} />

          <Route path="/popup/logout" component={LogoutView} />

          <Route render={() => <Redirect to={user ? '/popup/logout' : '/popup/login'} />} />

        </Switch>
      </div>
    </UserProvider>
  );
};

export default withRouter(Popup);
