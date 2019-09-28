import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { User, parseUser } from 'src/types/User';
import { UserProvider } from 'src/utils/UserContext';

import Loader from 'src/components/common/Loader';
import { ScrollToTop } from 'src/components/common/ScrollToTop';
import ErrorBoundary from 'src/components/common/ErrorBoundary';

import Popup from './popup';
import Integrations from './integrations';
import Pages from './pages';

import useAxios from './hooks/use-axios';

import './App.css';

const useUser = () => {
  const opts = { url: '/api/auth/me', validateStatus: (s: number) => [200, 403].includes(s), withCredentials: true };
  const [{ response, data, error, status }] = useAxios(opts, parseUser);
  const [user, setUser] = useState<User | undefined | null>();

  if (error)
    throw error;

  useEffect(() => {
    if (response) {
      if (status(200))
        setUser(data);
      else
        setUser(null);
    }
  }, [response, status, data]);

  return [user, setUser] as const;
};

const App: React.FC = () => {
  const [user, setUser] = useUser();

  if (user === undefined)
    return <Loader size="big" />;

  return (
    <ErrorBoundary>
      <UserProvider value={{ user, setUser }}>
        <Router>

          <ScrollToTop />

          <Switch>

            <Route path="/popup" component={Popup} />

            <Route path="/integration" component={Integrations} />

            <Route component={Pages} />

          </Switch>
        </Router>
      </UserProvider>
    </ErrorBoundary>
  );
};

export default hot(App);
