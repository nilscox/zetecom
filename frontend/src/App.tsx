import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { User } from './types/User';
import { UserProvider } from './utils/UserContext';
import { fetchUser } from './api/user';
import { Loader } from './components/Loader';
import { ScrollToTop } from './components/ScrollToTop';

import Popup from './popup';
import Integrations from './integrations';
import Pages from './pages';

import './App.css';

const useUser = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchUser();

        if (user)
          setUser(user);
        else
          setUser(null);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return {
    user,
    setUser,
  };
};

const App: React.FC = () => {
  const { user, setUser } = useUser();

  if (user === undefined)
    return <Loader size="big" />;

  return (
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
  );
};

export { App };
