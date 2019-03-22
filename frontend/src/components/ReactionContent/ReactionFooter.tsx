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

  return (
    <div className="reaction-footer">
      <div className="reaction-action">
        <img src='/assets/images/1f44d.png' />
        <div className="action-count">18</div>
      </div>
      <div className="reaction-action">
        <img src='/assets/images/1f44e.png' />
        <div className="action-count">444</div>
      </div>
      <div className="reaction-action">
        <img src='/assets/images/2665.png' />
        <div className="action-count">1</div>
      </div>
      <div
        className={'show-replies' + (repliesCount > 0 ? ' has-replies' : '')}
        onClick={toggleReplies}
      >
        { repliesCount } réponse{ repliesCount > 1 && 's' }
        { repliesCount > 0 && (displayReplies ? ' ⏶ ' : ' ⏷ ') }
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
