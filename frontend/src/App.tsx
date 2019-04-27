import React, { forwardRef, useContext, useState, useEffect, useRef } from 'react';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction, ReactionLabel } from './types/Reaction';
import { UserProvider } from './utils/UserContext';
import { InformationProvider } from './utils/InformationContext';
import { fetchUser } from './fetch/fetchUser';
import { fetchInformationFromYoutubeId } from './fetch/fetchInformation';
import { fetchRootReactions, postReaction } from './fetch/fetchReactions';
import { Loader } from './components/Loader';

import { MainReactionView } from './views/MainReactionView';
import { DefaultView } from './views/DefaultView';

import './App.css';

type AppContentProps = {
  information: Information;
};

const AppContent = forwardRef((props: AppContentProps, ref: any) => {
  const { information } = props;

  const [mainReaction, setMainReaction] = useState<Reaction>(undefined);

  if (mainReaction)
    return (
      <MainReactionView
        reaction={mainReaction}
        setAsMain={setMainReaction}
      />
    );

  return (
    <DefaultView setAsMain={setMainReaction} />
  );
});

type AppProps = {
  youtubeId: string,
};

const App = ({ youtubeId }: AppProps) => {
  const [user, setUser] = useState<User>(undefined);
  const [fetchingUser, setFetchingUser] = useState(false);
  const [information, setInformation] = useState<Information>(undefined);
  const [fetchingInformation, setFetchingInformation] = useState(false);

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
        } finally {
          setFetchingInformation(false);
        }
      })(),

    ]);
  }, []);

  if (fetchingUser || fetchingInformation)
    return <Loader size="big" />;

  if (!information)
    return <div>Information not found</div>;

  return (
    <UserProvider value={user}>
      <InformationProvider value={information}>
        <div style={{
          width: 650,
          margin: 'auto',
          paddingBottom: 20,
        }}>

        <AppContent information={information} />

        </div>
      </InformationProvider>
    </UserProvider>
  );
};

export { App };
