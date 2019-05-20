import React, { forwardRef, useContext, useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction } from './types/Reaction';
import { UserProvider } from './utils/UserContext';
import { fetchUser } from './fetch/fetchUser';
import { fetchRootReactions, postReaction } from './fetch/fetchReactions';
import { Loader } from './components/Loader';

import Home from './pages/Home';

import Youtube from './integrations/Youtube';

import './App.css';

const useUser = () => {
  const [fetchingUser, setFetching] = useState(false);
  const [user, setUser] = useState<User>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);

        const user = await fetchUser();

        if (user)
          setUser(user);
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  return {
    fetchingUser,
    user,
  };
};

const App: React.FC = () => {
  const { fetchingUser, user } = useUser();

  if (fetchingUser)
    return <Loader size="big" />;

  return (
    <UserProvider value={user}>
      <Router>
        <Switch>

          <Route path="/" exact component={Home} />

          <Route path="/integration/youtube" component={Youtube} />

        </Switch>
      </Router>
    </UserProvider>
  );
};

export { App };
