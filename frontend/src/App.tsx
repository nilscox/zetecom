import React from 'react';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction } from './types/Reaction';
import { UserProvider } from './utils/UserContext';
import { fetchUser } from './hooks/fetchUser';
import { fetchInformationFromYoutubeId } from './hooks/fetchInformation';
import { fetchReactionsList } from './hooks/fetchReactions';
import { ReactionContent } from './components/ReactionContent';

import './App.css';

type AppProps = {
  youtubeId: string,
};

const noop = () => {};

const App = ({ youtubeId }: AppProps) => {
  const user: User | null = fetchUser(localStorage.getItem('token'));
  const information: Information | null = fetchInformationFromYoutubeId(youtubeId);
  const reactions: Reaction[] | null = fetchReactionsList(information ? information.id : undefined);

  return (
    <UserProvider value={user}>
      <div style={{
        width: 950,
        marign: 'auto',
        backgroundColor: 'grey',
      }}>
        { reactions && reactions.length && (
          <ReactionContent
            reaction={reactions[0]}
            replyFormDisplayed={false}
            displayReplyForm={noop}
            setAsMain={noop}
            toggleReplies={noop}
          />
        ) }
      </div>
    </UserProvider>
  );
};

const mapStateToProps = (state: any) => ({
  information: state.information,
});

export { App };
