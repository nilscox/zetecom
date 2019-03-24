import React from 'react';

import { Reaction } from '../../types/Reaction';

type ReactionFooterProps = {
  reaction: Reaction;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void;
  onShowReplyForm: () => void;
};

const ReactionFooter = (props: ReactionFooterProps) => {
  const { reaction, displayReplies, toggleReplies, displayReplyForm, onShowReplyForm } = props;
  const { repliesCount } = reaction;
  const hasReplies = repliesCount > 0;

  return (
    <div className="reaction-footer">
      <div className="reaction-action action-approve">
        <img src='/assets/images/1f44d.png' />
        <div className="action-count">{ reaction.approveCount || 'X' }</div>
      </div>
      <div className="reaction-action action-refute">
        <img src='/assets/images/1f44e.png' />
        <div className="action-count">{ reaction.refuteCount || 'X' }</div>
      </div>
      <div className="reaction-action action-like">
        <img src='/assets/images/2665.png' />
        <div className="action-count">{ reaction.likeCount || 'X' }</div>
      </div>
      <div
        className={'show-replies' + (hasReplies ? ' has-replies' : '')}
        onClick={() => hasReplies && toggleReplies()}
      >
        { repliesCount } réponse{ repliesCount > 1 && 's' }
        { hasReplies && (displayReplies ? ' ▴ ' : ' ▾ ') }
      </div>
      <div
        className={'reply-action' + (displayReplyForm ? ' disabled' : '')}
        onClick={() => displayReplyForm || onShowReplyForm()}
      >
        <div className="reply-button">
          Répondre
        </div>
      </div>
    </div>
  );
};

export { ReactionFooter };
