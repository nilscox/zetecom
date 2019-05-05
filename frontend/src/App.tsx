import React, { forwardRef, useContext, useState, useEffect, useRef } from 'react';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction } from './types/Reaction';
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

const useToken = () => {
  const [token, setToken] = useState<string | undefined>(localStorage.getItem('token'));

  window.addEventListener('message', (evt: any) => {
    const { data } = evt;

    console.log(data);

    if (!data || evt.origin !== 'https://www.youtube.com')
      return;

    if (data.type === 'set-token')
      setToken(data.token);
  }, false);

  return token;
};

const useUser = (token: string) => {
  const [fetchingUser, setFetching] = useState(false);
  const [user, setUser] = useState<User>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);

        const user = await fetchUser(token);

        if (user)
          setUser(user);
      } finally {
        setFetching(false);
      }
    })();
  }, [token]);

  return {
    fetchingUser,
    user,
  };
};

const useInformation = (youtubeId: string) => {
  const [fetchingInformation, setFetching] = useState(false);
  const [information, setInformation] = useState<Information>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);

        const info = await fetchInformationFromYoutubeId(youtubeId);

        if (info)
          setInformation(info);
      } finally {
        setFetching(false);
      }
    })();
  }, [youtubeId]);

  return {
    fetchingInformation,
    information,
  };
};

type AppProps = {
  youtubeId: string,
};

const App = ({ youtubeId }: AppProps) => {
  const token = useToken();
  const { fetchingUser, user } = useUser(token);
  const { fetchingInformation, information } = useInformation(youtubeId);

  if (fetchingUser || fetchingInformation)
    return <Loader size="big" />;

  if (!information)
    return <div>Information not found</div>;

  return (
    <UserProvider value={user}>
      <InformationProvider value={information}>
        <div style={{
          width: 'auto',
          paddingBottom: 20,
        }}>

        <AppContent information={information} />

        </div>
      </InformationProvider>
    </UserProvider>
  );
};

export { App };
