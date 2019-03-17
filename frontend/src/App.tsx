import React, { useState, useEffect } from 'react';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction } from './types/Reaction';
import { UserProvider } from './utils/UserContext';
import { InformationProvider } from './utils/InformationContext';
import { fetchUser } from './fetch/fetchUser';
import { fetchInformationFromYoutubeId } from './fetch/fetchInformation';
import { fetchRootReactions } from './fetch/fetchReactions';
import { ReactionsList } from './components/ReactionsList';
import { Loader } from './components/Loader';

import './App.css';

type AppProps = {
  youtubeId: string,
};

const App = ({ youtubeId }: AppProps) => {
  const [user, setUser] = useState<User>(undefined);
  const [fetchingUser, setFetchingUser] = useState(false);
  const [information, setInformation] = useState<Information>(undefined);
  const [fetchingInformation, setFetchingInformation] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>(undefined);

  useEffect(() => {
    Promise.all([

      (async () => {
        setFetchingUser(true);

        try {
          const user = await fetchUser(localStorage.getItem('token'));

          if (user)
            setUser(user);
        } finally {
          setFetchingUser(false);
        }
      })(),

      (async () => {
        setFetchingInformation(true);

        try {
          const info = await fetchInformationFromYoutubeId(youtubeId);

          if (info)
            setInformation(info);

          const reactions = await fetchRootReactions(info.id);

          if (reactions)
            setReactions(reactions);
        } finally {
          setFetchingInformation(false);
        }
      })(),

    ]);
  }, []);

  if (fetchingUser || fetchingInformation)
    return <Loader />;

  if (!information)
    return <div>Information not found</div>;

  return (
    <UserProvider value={user}>
      <InformationProvider value={information}>
        <div style={{
          width: 950,
          margin: 'auto',
        }}>
          <ReactionsList reactions={reactions || []} />
        </div>
      </InformationProvider>
    </UserProvider>
  );
};

const mapStateToProps = (state: any) => ({
  information: state.information,
});

export { App };
