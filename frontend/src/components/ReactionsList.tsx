import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';

import { Reaction } from '../types/Reaction';
import { fetchReplies } from '../fetch/fetchReactions';
import { ReactionContent } from './ReactionContent';
import { ReactionForm } from './ReactionForm';

import './ReactionsList.css';

type ReactionsListProps = {
  reactions: Reaction[];
};

type ReactionWrapperProps = {
  reaction: Reaction;
};

type ReactionRepliesProps = {
  fetching: boolean;
  replies: Reaction[];
};

const noop = () => {};

const ReactionReplies = ({ fetching, replies }: ReactionRepliesProps) => {
  if (fetching)
    return <div>loading...</div>;

  if (!replies)
    return null;

  if (!replies.length)
    return <div>Pas de réponse pour le moment</div>

  return  (
    <div className="reaction-replies">
      <div className="reaction-replies-indent" />
      <div className="reaction-replies-content">
        <ReactionsList reactions={replies} />
      </div>
    </div>
   );
};

const ReactionWrapper = (props: ReactionWrapperProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [fetchingReplies, setFetchingReplies] = useState(false);
  const [replies, setReplies] = useState<Reaction[]>(null);

  useEffect(() => {
    if (showReplies && !replies) {
      fetchReplies(props.reaction.id)
        .then((replies: Reaction[]) => setReplies(replies))
        .then(() => setFetchingReplies(false));
    }
  });

  const toggleReplise = () => {
    if (!replies)
      setFetchingReplies(true);

    setShowReplies(!showReplies);
  };

  return (
    <div className="reaction-wrapper">

      <ReactionContent
        reaction={props.reaction}
        replyFormDisplayed={showReplyForm}
        displayReplyForm={() => setShowReplyForm(true)}
        setAsMain={noop}
        toggleReplies={toggleReplise}
      />

      <Collapse isOpened={showReplyForm}>
        <ReactionForm onSubmit={noop} onClose={() => setShowReplyForm(false)} />
      </Collapse>

      <Collapse isOpened={showReplies}>
        <ReactionReplies fetching={fetchingReplies} replies={replies} />
      </Collapse>

    </div>
  );
};

const ReactionsList = (props: ReactionsListProps) => {
  return (
    <div className="reactions-list">
      { props.reactions.map(reaction => (
        <ReactionWrapper
          key={reaction.id}
          reaction={reaction}
        />
      )) }
    </div>
  );
};

export { ReactionsList };
