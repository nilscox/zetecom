import React, { useContext, useEffect, useState } from 'react';
import { Collapse } from 'react-collapse';

import InformationContext from '../../utils/InformationContext';
import { Reaction } from '../../types/Reaction';
import { fetchReplies } from '../../fetch/fetchReactions';
import { ReactionContent } from '../ReactionContent/ReactionContent';
import { ReactionForm } from '../ReactionForm/ReactionForm';
import { ReactionsList } from '../ReactionsList/ReactionsList';
import { Loader } from '../Loader';

import './ReactionContainer.css';

type ReactionRepliesProps = {
  fetching: boolean;
  replies: Reaction[];
  setAsMain: (reaction: Reaction) => void;
};

const ReactionReplies = (props: ReactionRepliesProps) => {
  const { fetching, replies } = props;

  if (fetching)
    return <Loader />;

  if (!replies || !replies.length)
    return null;

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

type ReactionContainerProps = {
  reaction: Reaction;
  setAsMain: (reaction: Reaction) => void;
};

export const ReactionContainer = (props: ReactionContainerProps) => {
  const information = useContext(InformationContext);
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const [fetchingReplies, setFetchingReplies] = useState(false);
  const [replies, setReplies] = useState<Reaction[]>(null);

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

  const onShowReplyForm = () => {
    setDisplayReplies(true);
    setDisplayReplyForm(true);
  };

  const onReplySubmitted = (reply: Reaction) => {
    setReplies([reply, ...replies]);
    setDisplayReplyForm(false);
  };

  return (
    <div className="reaction-container">

      <ReactionContent
        reaction={props.reaction}
        displayReplies={displayReplies}
        displayReplyForm={displayReplyForm}
        onShowReplyForm={onShowReplyForm}
        toggleReplies={toggleReplies}
      />

      <Collapse isOpened={displayReplyForm}>
        <div className="reaction-reply-form-wrapper">
          <div className="reaction-reply-form-indent" />
          <div className="reaction-reply-form">
            <ReactionForm
              replyTo={props.reaction}
              onClose={() => setDisplayReplyForm(false)}
              onSubmitted={onReplySubmitted}
            />
          </div>
        </div>
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
