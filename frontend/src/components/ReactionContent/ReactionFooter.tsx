import React, { useContext } from 'react';

import UserContext from '../../utils/UserContext';
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
  const user = useContext(UserContext);
  const { repliesCount } = reaction;
  const hasReplies = repliesCount > 0;
  const canShortReact = !!user ? ' can-short-react' : '';

  return (
    <div className="reaction-footer">
      <div className={'reaction-action action-approve' + canShortReact}>
        <img src='/assets/images/1f44d.png' />
        <div className="action-count">{ reaction.shortRepliesCount.approve }</div>
      </div>
      <div className={'reaction-action action-refute' + canShortReact}>
        <img src='/assets/images/1f44e.png' />
        <div className="action-count">{ reaction.shortRepliesCount.refute }</div>
      </div>
      <div className={'reaction-action action-like' + canShortReact}>
        <img src='/assets/images/2665.png' />
        <div className="action-count">{ reaction.shortRepliesCount.skeptic }</div>
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
