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

import Popup from './popup/Popup';

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
    <UserProvider value={user}>
      <Router>
        <Switch>

          <Route path="/" exact component={Home} />

          <Route path="/integration/youtube" component={Youtube} />

          <Route path="/popup" render={() => <Popup setUser={setUser} />} />

        </Switch>
      </Router>
    </UserProvider>
  );
};

export { App };
