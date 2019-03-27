import React, { useContext, useState } from 'react';

import { classList } from '../../utils/classList';
import UserContext from '../../utils/UserContext';
import { postShortReply } from '../../fetch/fetchReactions';
import { Reaction, ShortReplyType } from '../../types/Reaction';

type ReactionFooterProps = {
  reaction: Reaction;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void;
  onShowReplyForm: () => void;
};

const shortReplies = [
  { type: ShortReplyType.APPROVE, image: '/assets/images/1f44d.png' },
  { type: ShortReplyType.REFUTE, image: '/assets/images/1f44e.png' },
  { type: ShortReplyType.SKEPTIC, image: '/assets/images/1f9d0.png' },
];

const useShortReplies = (reaction: Reaction) => {
  const [userShortReply, setUserShortReply] = useState(reaction.userShortReply);
  const [shortRepliesCount, setShortRepliesCount] = useState(reaction.shortRepliesCount);

  const onUserShortReply = (type: ShortReplyType) => {
    // newShortRepliesCount
    let nsrc = {
      approve: shortRepliesCount.approve,
      refute: shortRepliesCount.refute,
      skeptic: shortRepliesCount.skeptic,
    };

    if (type === userShortReply) {
      nsrc[type]--;
      type = null;
    } else {
      nsrc[userShortReply]--;
      nsrc[type]++;
    }

    setShortRepliesCount(nsrc);
    setUserShortReply(type);

    postShortReply(reaction.id, type)
      .then((reaction: Reaction) => {
        // ...
      });
  };

  return  {
    shortRepliesCount,
    userShortReply,
    setUserShortReply: onUserShortReply,
  };
};

const ReactionFooter = (props: ReactionFooterProps) => {
  const {
    reaction,
    displayReplies,
    toggleReplies,
    displayReplyForm,
    onShowReplyForm,
  } = props;

  const user = useContext(UserContext);
  const { repliesCount } = reaction;
  const hasReplies = repliesCount > 0;

  const {
    shortRepliesCount,
    userShortReply,
    setUserShortReply,
  } = useShortReplies(reaction);

  return (
    <div className="reaction-footer">

      <div className="short-replies">
        { shortReplies.map(({ type, image }) => (
          <div
            key={type}
            className={classList(
              'short-reply',
              `short-reply--${type}`,
              !!user && 'can-short-reply',
              userShortReply === type && 'did-short-reply',
            )}
            onClick={() => setUserShortReply(type)}
          >
            <img src={image} />
            <div className="short-replies-count">
              { shortRepliesCount[type] }
            </div>
          </div>
        )) }
      </div>

      <div
        className={classList('show-replies', hasReplies && 'has-replies')}
        onClick={() => hasReplies && toggleReplies()}
      >
        { repliesCount } réponse{ repliesCount > 1 && 's' }
        { hasReplies && (displayReplies ? ' ▴ ' : ' ▾ ') }
      </div>

      <div className="reaction-footer-filler" />

      <button
        className={classList('reply-button', displayReplyForm && 'disabled')}
        onClick={() => displayReplyForm || onShowReplyForm()}
      >
        Répondre
      </button>

    </div>
  );
};

export { ReactionFooter };
