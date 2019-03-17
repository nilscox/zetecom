import React, { useState, useEffect } from 'react';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction } from './types/Reaction';
import { UserProvider } from './utils/UserContext';
import { fetchUser } from './fetch/fetchUser';
import { fetchInformationFromYoutubeId } from './fetch/fetchInformation';
import { fetchRootReactions } from './fetch/fetchReactions';
import { ReactionsList } from './components/ReactionsList';

import './App.css';

type AppProps = {
  youtubeId: string,
};

const App = ({ youtubeId }: AppProps) => {
  const [user, setUser] = useState<User>(undefined);
  const [information, setInformation] = useState<Information>(undefined);
  const [reactions, setReactions] = useState<Reaction[]>(undefined);

  useEffect(() => {
    fetchUser(localStorage.getItem('token'))
      .then(user => user && setUser(user));

    fetchInformationFromYoutubeId(youtubeId)
      .then(info => {
        if (info) {
          setInformation(info);
          fetchRootReactions(info.id)
            .then(reactions => setReactions(reactions));
        }
      });
  }, []);

  return (
    <UserProvider value={user}>
      <div style={{
        width: 950,
        margin: 'auto',
      }}>
        <ReactionsList reactions={reactions || []} />
      </div>
    </UserProvider>
  );
};

const mapStateToProps = (state: any) => ({
  information: state.information,
});

export { App };
