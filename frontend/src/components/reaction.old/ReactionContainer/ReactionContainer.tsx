import React, { useContext, useEffect, useState } from 'react';

import { Reaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import { classList } from 'src/utils/classList';
import { fetchReplies } from 'src/api/reaction';
import Loader from 'src/components/common/Loader';
import Collapse from 'src/components/common/Collapse';

import { ReactionContent } from '../ReactionContent/ReactionContent';
import { ReactionForm } from '../ReactionForm/ReactionForm';
import { ReactionsList } from '../ReactionsList/ReactionsList';

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

  return (
    <div className="reaction-replies">
      <div className="reaction-replies-indent" />
      <div className="reaction-replies-content">
        <ReactionsList reactions={replies} />
      </div>
    </div>
  );
};

type ReactionContainerProps = {
  reaction: Reaction;
  setAsMain: (reaction: Reaction) => void;
};

export const ReactionContainer: React.FC<ReactionContainerProps> = (props) => {
  const sort = SortType.DATE_ASC;
  const [reaction, setReaction] = useState(props.reaction);
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const [fetchingReplies, setFetchingReplies] = useState(false);
  const [replies, setReplies] = useState<Reaction[]>(null);

  useEffect(() => {
    if (displayReplies && !replies) {
      fetchReplies(reaction.id)
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
    if (replies === null)
      setFetchingReplies(true);

    setDisplayReplies(true);
    setDisplayReplyForm(true);
  };

  const onReplySubmitted = (reply: Reaction) => {
    setReplies([reply, ...replies]);
    setReaction({ ...reaction, repliesCount: reaction.repliesCount + 1 });
    setDisplayReplyForm(false);
  };

  return (
    <div className={
      classList(
        'reaction-container',
        displayReplyForm && 'reply-form-open',
        displayReplies && 'replies-open',
      )
    }>

      <ReactionContent
        reaction={reaction}
        displayReplies={displayReplies}
        displayReplyForm={displayReplyForm}
        onShowReplyForm={onShowReplyForm}
        toggleReplies={toggleReplies}
        onReactionUpdated={setReaction}
      />

      <Collapse open={displayReplyForm}>
        <div className="reaction-reply-form-wrapper">
          <div className="reaction-reply-form-indent" />
          <div className="reaction-reply-form">
            <ReactionForm
              replyTo={reaction}
              onClose={() => setDisplayReplyForm(false)}
              onSubmitted={onReplySubmitted}
            />
          </div>
        </div>
      </Collapse>

      <Collapse open={fetchingReplies || !!(displayReplies && replies && replies.length > 0)}>
        <ReactionReplies
          fetching={fetchingReplies}
          replies={replies}
          setAsMain={props.setAsMain}
        />
      </Collapse>

    </div>
  );
};
