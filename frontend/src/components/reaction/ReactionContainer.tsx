import React, { useCallback, useEffect, useState } from 'react';

import { Subject } from 'src/types/Subject';
import { Reaction } from 'src/types/Reaction';
import { fetchReplies } from 'src/api/reaction';
import { useTheme } from 'src/utils/Theme';
import Flex from 'src/components/common/Flex';
import Loader from 'src/components/common/Loader';
import Collapse from 'src/components/common/Collapse';

import ReactionComponent from './Reaction';
import ReactionsList from './ReactionsList';
import ReactionForm from './ReactionForm';

const useReplies = (parent?: Reaction) => {
  const [replies, setReplies] = useState<Reaction[] | undefined>();
  const [fetching, setFetching] = useState(true);

  const onFetchReplies = useCallback(async () => {
    if (!parent)
      return;

    setFetching(true);

    try {
      setReplies(await fetchReplies(parent.id));
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }

  }, [parent, setReplies, setFetching]);

  const addReply = useCallback((reply: Reaction) => {
    setReplies([reply, ...replies]);
  }, [setReplies, replies]);

  return {
    fetchingReplies: fetching,
    replies,
    fetchReplies: onFetchReplies,
    addReply,
  };
};

const Indented: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sizes: { big }, colors: { border } } = useTheme();

  return (
    <Flex flexDirection="row" pt={big}>
      <div style={{ borderLeft: `8px solid ${border}`, paddingLeft: big }} />
      <div style={{ flex: 1 }}>
        { children }
      </div>
    </Flex>
  );
};

type ReactionContainerProps = {
  subject: Subject;
  reaction: Reaction;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ subject, reaction }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const { fetchingReplies, replies, fetchReplies, addReply } = useReplies(reaction);
  const [showReplyForm, hideReplyForm] = [true, false].map(v => () => setDisplayReplyForm(v));

  const toggleReplies = useCallback(() => {
    if (!replies)
      fetchReplies();

    setDisplayReplies(!displayReplies);
  }, [replies, fetchReplies, setDisplayReplies, displayReplies]);

  const onCreated = useCallback((reaction: Reaction) => {
    addReply(reaction);
    hideReplyForm();
  }, [addReply, hideReplyForm]);

  useEffect(() => {
    if (displayReplyForm && !displayReplies)
      setTimeout(toggleReplies, 100);
  }, [displayReplyForm, displayReplies, setDisplayReplies]);

  return (
    <>

      <ReactionComponent
        reaction={reaction}
        displayReplies={displayReplies}
        toggleReplies={!displayReplyForm ? toggleReplies : null}
        displayReplyForm={displayReplyForm}
        onReply={showReplyForm}
      />

      <Collapse open={displayReplyForm}>
        <Indented>
          <ReactionForm
            subject={subject}
            parent={reaction}
            closeForm={hideReplyForm}
            onCreated={onCreated}
          />
        </Indented>
      </Collapse>

      <Collapse open={displayReplies}>
        <Indented>
          { fetchingReplies ? (
            <Loader />
          ) : (
            <ReactionsList subject={subject} reactions={replies} />
          ) }
        </Indented>
      </Collapse>

    </>
  );
};

export default ReactionContainer;
