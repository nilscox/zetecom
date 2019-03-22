import React, { useContext, useEffect, useRef, useState } from 'react';
import { Collapse } from 'react-collapse';

import { Reaction, ReactionLabel } from '../types/Reaction';
import { fetchReplies, postReaction } from '../fetch/fetchReactions';
import InformationContext from '../utils/InformationContext';
import { ReactionContent } from './ReactionContent';
import { ReactionForm } from './ReactionForm';
import { Loader } from './Loader';

import './ReactionsList.css';

type ReactionsListProps = {
  reactions: Reaction[];
  setAsMain: (reaction: Reaction) => void;
};

type ReactionWrapperProps = {
  reaction: Reaction;
  setAsMain: (reaction: Reaction) => void;
};

type ReactionRepliesProps = {
  fetching: boolean;
  replies: Reaction[];
  setAsMain: (reaction: Reaction) => void;
};

const ReactionReplies = (props: ReactionRepliesProps) => {
  const { fetching, replies } = props;

  if (fetching)
    return <Loader />;

  if (!replies)
    return null;

  if (!replies.length)
    return <div>Pas de réponse pour le moment</div>

  return  (
    <div className="reaction-replies">
      <div className="reaction-replies-indent" />
      <div className="reaction-replies-content">
        <ReactionsList
          reactions={replies}
          setAsMain={props.setAsMain}
        />
      </div>
    </div>
   );
};

const ReactionWrapper = (props: ReactionWrapperProps) => {
  const information = useContext(InformationContext);
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const [fetchingReplies, setFetchingReplies] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [replies, setReplies] = useState<Reaction[]>(null);
  const replyFormRef = useRef(null);

  useEffect(() => {
    if (displayReplies && !replies) {
      fetchReplies(props.reaction.id)
        .then((replies: Reaction[]) => setReplies(replies))
        .then(() => setFetchingReplies(false));
    }
  });

  useEffect(() => {
    setDisplayReplies(false);
    setReplies(null);
  }, [props.reaction]);

  const toggleReplies = () => {
    if (!replies)
      setFetchingReplies(true);

    setDisplayReplies(!displayReplies);
  };

  const onSubmitReply = (label: ReactionLabel, quote: string | null, text: string) => {
    setSubmittingReply(true);

    postReaction(information.id, label, quote, text, props.reaction.id)
      .then((reply: Reaction) => {
        setReplies([reply, ...replies]);
        setSubmittingReply(false);
        setDisplayReplyForm(false);
        replyFormRef.current.clear();
      });
  };

  const onShowReplyForm = () => {
    setDisplayReplies(true);
    setDisplayReplyForm(true);
  };

  return (
    <div className="reaction-wrapper">

      <ReactionContent
        reaction={props.reaction}
        displayReplies={displayReplies}
        displayReplyForm={displayReplyForm}
        onShowReplyForm={onShowReplyForm}
        toggleReplies={toggleReplies}
      />

      <Collapse isOpened={displayReplyForm}>
        <ReactionForm
          ref={replyFormRef}
          onSubmit={onSubmitReply}
          isSubmitting={submittingReply}
          onClose={() => setDisplayReplyForm(false)}
        />
      </Collapse>

      <Collapse isOpened={displayReplies}>
        <ReactionReplies
          fetching={fetchingReplies}
          replies={replies}
          setAsMain={props.setAsMain}
        />
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
          setAsMain={props.setAsMain}
        />
      )) }
    </div>
  );
};

export { ReactionsList, ReactionWrapper };
