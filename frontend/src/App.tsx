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
    Promise.all([

      (async () => {
        const user = await fetchUser(localStorage.getItem('token'));

        if (user)
          setUser(user);
      })(),

      (async () => {
        const info = await fetchInformationFromYoutubeId(youtubeId);

        if (info)
          setInformation(info);

        const reactions = await fetchRootReactions(info.id);

        if (reactions)
          setReactions(reactions);
      })(),

    ]);
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
