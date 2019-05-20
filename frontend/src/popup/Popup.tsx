import React, { useState, useEffect, useContext } from 'react';
import {
  Route,
  RouteComponentProps,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import axios from 'axios';

import { Loader } from '../components/Loader';
import { User } from '../types/User';
import UserContext from '../utils/UserContext';
import { SetUserProvider } from './SetUserContext';

import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import SignupView from './views/SignupView';
import PostSignupView from './views/PostSignupView';
import PasswordResetView from './views/PasswordResetView';

type PopupProps = {
  setUser: (user: User) => void;
};

const Popup: React.FC<PopupProps & RouteComponentProps> = ({ setUser, history }) => {
  const user = useContext(UserContext);

  return (
    <div style={{ paddingBottom: 15 }}>
      <SetUserProvider value={setUser}>
        <Switch>

          <Route path="/popup/login" component={LoginView} />
          <Route path="/popup/signup" exact component={SignupView} />
          <Route path="/popup/signup/post-signup" component={PostSignupView} />
          <Route path="/popup/password-reset" component={PasswordResetView} />

          <Route path="/popup/logout" component={LogoutView} />

          <Route render={() => <Redirect to={user ? '/popup/logout' : '/popup/login'} />} />

        </Switch>
      </SetUserProvider>
    </div>
  );
};

export default withRouter(Popup);
