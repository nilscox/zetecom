import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { User } from 'src/types/User';
import { fetchUser } from 'src/api/user';
import { UserProvider } from 'src/utils/UserContext';

import Loader from 'src/components/common/Loader';
import { ScrollToTop } from 'src/components/common/ScrollToTop';
import ErrorBoundary from 'src/components/common/ErrorBoundary';

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

export default App;
