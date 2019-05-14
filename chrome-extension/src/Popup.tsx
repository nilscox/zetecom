import React, { useState, useEffect, useContext } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import SignupView from './views/SignupView';
import PostSignupView from './views/PostSignupView';
import PasswordResetView from './views/PasswordResetView';
import WormholeContext from './contexts/WormholeContext';
import { Loader } from './components/Loader';
import User from './types/User';
import Wormhole, { FetchMeSuccess, SignupSuccess } from './types/Wormhole';

export type ViewType = 'login' | 'logout' | 'signup' | 'postsignup' | 'passwordreset';

export type ViewProps = {
  user?: User;
};

const Popup: React.FC<RouteComponentProps> = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const wormhole = useContext<Wormhole | null>(WormholeContext);

  useEffect(() => {
    if (!wormhole) return;

    wormhole.onEvent('FETCH_ME_SUCCESS', (event: FetchMeSuccess) => {
      setLoading(false);
      history.push('logout');
      setUser(event.user);
    });
    wormhole.onEvent('SIGNUP_SUCCESS', (event: SignupSuccess) => {
      setLoading(false);
      history.push('/post-signup');
      setUser(event.user);
    });
    wormhole.onEvent('FETCH_ME_FAILURE', () => setLoading(false));
    wormhole.onEvent('SIGNUP_FAILURE', () => setLoading(false));
    wormhole.onEvent('LOGIN_SUCCESS', () => history.push('/logout'));
    wormhole.onEvent('LOGOUT_SUCCESS', () => history.push('/login'));

    wormhole.postEvent({ type: 'FETCH_ME' });
  }, [wormhole]);

  console.log(match);

  if (loading)
    return <Loader size='big' />;

  return (
    <div style={{ padding: '0 40px' }}>
      <Switch>
        <Route path='/login' component={LoginView} />
        <Route path='/logout' component={LogoutView} />
        <Route path='/signup' component={SignupView} />
        <Route path='/post-signup' component={PostSignupView} />
        <Route
          path='/password-reset'
          component={PasswordResetView}
        />
        <Route render={() => <Redirect to={user ? '/logout' : '/login'} />} />
      </Switch>
    </div>
  );
};

export default withRouter(Popup);
