import React, { useState, useEffect, useContext } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import SignupView from './views/SignupView';
import PostSignupView from './views/PostSignupView';
import PasswordResetView from './views/PasswordResetView';
import WormholeContext from './contexts/WormholeContext';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Wormhole, FetchMeSuccess, SignupSuccess, LoginSuccess } from './types/Wormhole';
import { Provider as UserProvider } from './contexts/userContext';

const Popup: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const wormhole = useContext<Wormhole | null>(WormholeContext);

  useEffect(() => {
    if (!wormhole)
      return;

    wormhole.onEvent('FETCH_ME_SUCCESS', (event: FetchMeSuccess) => {
      setLoading(false);
      history.push('logout');
      setUser(event.user);
    });
    wormhole.onEvent('SIGNUP_SUCCESS', (event: SignupSuccess) => {
      history.push('/signup/post-signup');
      setUser(event.user);
    });
    wormhole.onEvent('LOGIN_SUCCESS', (event: LoginSuccess) => {
      setUser(event.user);
      history.push('/logout');
    });
    wormhole.onEvent('SIGNUP_FAILURE', () => setLoading(false));
    wormhole.onEvent('FETCH_ME_FAILURE', () => setLoading(false));
    wormhole.onEvent('LOGOUT_SUCCESS', () => history.push('/login'));

    wormhole.postEvent({ type: 'FETCH_ME' });
  }, [wormhole]);

  if (loading)
    return <Loader size="big" />;

  return (
    <div style={{ padding: '0 40px', height: '100%', transition: 'height 2s ease' }}>
      <UserProvider value={user}>
        <Switch>

          <Route path="/login" component={LoginView} />
          <Route path="/signup" component={SignupView} />
          <Route path="/signup/post-signup" component={PostSignupView} />
          <Route path="/password-reset" component={PasswordResetView} />

          <Route path="/logout" component={LogoutView} />

          <Route render={() => <Redirect to={user ? '/logout' : '/login'} />} />

        </Switch>
      </UserProvider>
    </div>
  );
};

export default withRouter(Popup);
