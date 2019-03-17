import React, { useState, useEffect, useRef } from 'react';

import { User } from './types/User';
import { Information } from './types/Information';
import { Reaction, ReactionLabel } from './types/Reaction';
import { UserProvider } from './utils/UserContext';
import { InformationProvider } from './utils/InformationContext';
import { fetchUser } from './fetch/fetchUser';
import { fetchInformationFromYoutubeId } from './fetch/fetchInformation';
import { fetchRootReactions, postReaction } from './fetch/fetchReactions';
import { ReactionsList } from './components/ReactionsList';
import { Loader } from './components/Loader';
import { ReactionForm } from './components/ReactionForm';

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

  const [submittingReply, setSubmittingReply] = useState(false);
  const replyFormRef = useRef(null);

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

  const onSubmitReply = (label: ReactionLabel, quote: string | null, text: string) => {
    setSubmittingReply(true);

    postReaction(information.id, label, quote, text)
      .then((reaction: Reaction) => {
        setReactions([reaction, ...reactions]);
        setSubmittingReply(false);
        replyFormRef.current.clear();
      });
  };

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

          <ReactionForm
            ref={replyFormRef}
            onSubmit={onSubmitReply}
            isSubmitting={submittingReply}
          />

          <ReactionsList reactions={reactions || []} />

        </div>
      </InformationProvider>
    </UserProvider>
  );
};

export { App };
