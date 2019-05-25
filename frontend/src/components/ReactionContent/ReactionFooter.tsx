import React, { useContext, useState } from 'react';

import { classList } from '../../utils/classList';
import UserContext from '../../utils/UserContext';
import { postQuickReaction } from '../../api/reaction';
import { Reaction, QuickReactionType } from '../../types/Reaction';

type ReactionFooterProps = {
  reaction: Reaction;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void;
  onShowReplyForm: () => void;
};

const quickReactions = [
  { type: QuickReactionType.APPROVE, image: '/assets/images/1f44d.png' },
  { type: QuickReactionType.REFUTE, image: '/assets/images/1f44e.png' },
  { type: QuickReactionType.SKEPTIC, image: '/assets/images/1f9d0.png' },
];

const useQuickReactions = (reaction: Reaction) => {
  const [userQuickReaction, setUserQuickReaction] = useState(reaction.userQuickReaction);
  const [quickReactionsCount, setQuickReactionsCount] = useState(reaction.quickReactionsCount);

  const onUserQuickReaction = (type: QuickReactionType) => {
    // newQuickReactionsCount
    let nqrc = {
      approve: quickReactionsCount.approve,
      refute: quickReactionsCount.refute,
      skeptic: quickReactionsCount.skeptic,
    };

    if (type === userQuickReaction) {
      nqrc[type]--;
      type = null;
    } else {
      nqrc[userQuickReaction]--;
      nqrc[type]++;
    }

    setQuickReactionsCount(nqrc);
    setUserQuickReaction(type);

    postQuickReaction(reaction.id, type)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((reaction: Reaction) => {
        // ...
      });
  };

  return {
    quickReactionsCount,
    userQuickReaction,
    setUserQuickReaction: onUserQuickReaction,
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

  const { user } = useContext(UserContext);
  const { repliesCount } = reaction;
  const hasReplies = repliesCount > 0;

  const {
    quickReactionsCount,
    userQuickReaction,
    setUserQuickReaction,
  } = useQuickReactions(reaction);

  return (
    <div className="reaction-footer">

      <div className="quick-reactions">
        { quickReactions.map(({ type, image }) => (
          <div
            key={type}
            className={classList(
              'quick-reaction',
              `quick-reaction--${type}`,
              !!user && 'can-quick-reaction',
              userQuickReaction === type && 'did-quick-reaction',
            )}
            onClick={() => !!user && setUserQuickReaction(type)}
          >
            <img src={image} />
            <div className="quick-reactions-count">
              { quickReactionsCount[type] }
            </div>
          </div>
        )) }
      </div>

      <div
        className={classList(
          'show-replies',
          hasReplies && !displayReplyForm && 'can-toggle-replies'
        )}
        onClick={() => hasReplies && !displayReplyForm && toggleReplies()}
      >
        { repliesCount } réponse{ repliesCount > 1 && 's' }
        { hasReplies && !displayReplyForm && (displayReplies ? ' ▾ ' : ' ▸ ') }
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
