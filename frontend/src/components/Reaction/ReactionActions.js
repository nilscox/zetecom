import * as React from 'react';
import PropTypes from 'prop-types';

import { classList } from 'utils';

const ReactionActions = ({ approves, didApprove, refutes, didRefute, likes, didLike, repliesCount, showReplies, onShowReplies, isReplying, onReply }) => (
  <div className="reaction-actions p-2 d-flex">

    <div
      className={classList(
        'reaction-action', 'action-approve', 'border',
        didApprove && 'did-approve',
      )}
    >
      J'approuve ({ approves })
    </div>

    <div
      className={classList(
        'reaction-action', 'action-refute', 'border',
        didRefute && 'did-refute',
      )}
    >
      Je réfute ({ refutes })
    </div>

    <div
      className={classList(
        'reaction-action', 'action-like', 'border',
        didLike && 'did-like',
      )}
    >
      +1 ({ likes })
    </div>

    <div className={
      classList(
        'reaction-action',
        'action-show-replies',
        repliesCount > 0 && 'has-replies',
      )}
      onClick={onShowReplies}
    >
      { repliesCount } réponse{ repliesCount > 1 && 's' }
      { repliesCount > 0 && (showReplies ? ' ⏶ ' : ' ⏷ ') }
    </div>

    <div className="flex-grow-1" />

    { !isReplying && <div className="reaction-action action-reply border" onClick={onReply}>Répondre</div> }

  </div>
);

ReactionActions.propTypes = {
  approves: PropTypes.number.isRequired,
  didApprove: PropTypes.bool.isRequired,
  refutes: PropTypes.number.isRequired,
  didRefute: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  didLike: PropTypes.bool.isRequired,
  repliesCount: PropTypes.number.isRequired,
  showReplies: PropTypes.bool.isRequired,
  onShowReplies: PropTypes.func.isRequired,
  isReplying: PropTypes.bool.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default ReactionActions;
