/* eslint-disable max-lines */

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Collapse from 'src/components/common/Collapse';
import Loader from 'src/components/common/Loader';
import { Reaction } from 'src/types/Reaction';

import ReactionComponent from '../ReactionComponent';
import ReactionCreationForm from '../ReactionForm/ReactionCreationForm';
import ReactionEditionForm from '../ReactionForm/ReactionEditionForm';
import ReactionsList from '../ReactionsList';

import FetchMoreReplies from './FetchMoreReplies';
import useReplies from './hooks/useReplies';
import useReport from './hooks/useReport';
import useViewHistory from './hooks/useViewHistory';
import Indented from './Indented';

type ReactionContainerProps = {
  reaction: Reaction;
  onEdited?: (reaction: Reaction) => void;
};

const ReactionContainer: React.FC<ReactionContainerProps> = ({ reaction: originalReaction, onEdited }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [reaction, setReaction] = useState(originalReaction);

  const [
    { replies, total: totalReplies, loading, error },
    { fetchMoreReplies, addReply, replaceReply },
  ] = useReplies(reaction);

  if (error)
    throw error;

  const remainingReplies = useMemo(() => {
    if (!replies || typeof replies.length !== 'number')
      return;

    return totalReplies - replies.length;
  }, [replies, totalReplies]);

  const report = useReport(reaction);
  const viewHistory = useViewHistory(reaction);

  const [showReplyForm, hideReplyForm] = [true, false].map(v => () => setDisplayReplyForm(v));
  const [edit, closeEditionForm] = [true, false].map(v => () => setEditing(v));

  const toggleReplies = useCallback(() => {
    if (!replies && !error)
      fetchMoreReplies();

    setDisplayReplies(!displayReplies);
  }, [replies, error, fetchMoreReplies, setDisplayReplies, displayReplies]);

  const onCreated = (created: Reaction) => {
    addReply(created);
    hideReplyForm();
    setReaction({
      ...reaction,
      repliesCount: reaction.repliesCount + 1,
    });
  };

  const onReplyEdited = (reply: Reaction) => {
    if (!replies)
      return;

    replaceReply(reply);
  };

  const onReactionEdited = (reaction: Reaction) => {
    onEdited(reaction);
    closeEditionForm();
  };

  useEffect(() => void setReaction(originalReaction), [originalReaction]);

  useEffect(() => {
    if (displayReplyForm && !displayReplies) {
      const timeout = setTimeout(toggleReplies, 100);
      return () => clearTimeout(timeout);
    }
  }, [displayReplyForm, displayReplies, toggleReplies]);

  return (
    <>

      { editing ? (
        <ReactionEditionForm
          reaction={reaction}
          onEdited={onReactionEdited}
          closeForm={closeEditionForm}
        />
      ) : (
        <ReactionComponent
          reaction={reaction}
          displayReplies={displayReplies}
          toggleReplies={!displayReplyForm ? toggleReplies : null}
          displayReplyForm={displayReplyForm}
          onReply={showReplyForm}
          onEdit={onEdited ? edit : undefined}
          onViewHistory={viewHistory}
          onReport={report}
        />
      ) }

      <Collapse open={displayReplyForm}>
        <Indented>
          <ReactionCreationForm
            parent={reaction}
            closeForm={hideReplyForm}
            onCreated={onCreated}
          />
        </Indented>
      </Collapse>

      <Collapse open={displayReplies}>
        <Indented>
          <ReactionsList
            reactions={replies || []}
            id={`reactions-list-${reaction.id}`}
            onEdited={onReplyEdited}
          />
          { loading && <Loader /> }
          { remainingReplies > 0 && !loading && (
            <FetchMoreReplies
              remainingReplies={remainingReplies}
              fetchMoreReplies={fetchMoreReplies}
            />
          ) }
        </Indented>
      </Collapse>

    </>
  );
};

export default ReactionContainer;
