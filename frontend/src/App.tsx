import React from 'react';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction } from './types/Reaction';
import { UserProvider } from './utils/UserContext';
import { fetchUser } from './hooks/fetchUser';
import { fetchInformationFromYoutubeId } from './hooks/fetchInformation';
import { fetchRootReactions } from './hooks/fetchReactions';
import { ReactionsList } from './components/ReactionsList';

import './App.css';

type AppProps = {
  youtubeId: string,
};

const App = ({ youtubeId }: AppProps) => {
  const user: User | null = fetchUser(localStorage.getItem('token'));
  const information: Information | null = fetchInformationFromYoutubeId(youtubeId);
  const reactions: Reaction[] | null = fetchRootReactions(information ? information.id : undefined);

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
