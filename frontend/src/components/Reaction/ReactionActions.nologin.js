import * as React from 'react';
import PropTypes from 'prop-types';

import { classList } from 'utils';

const ReactionActionsNoLogin = ({ approves, refutes, likes, repliesCount, showReplies, onShowReplies }) => (
  <div className="reaction-actions nologin p-2 d-flex">

    <div className="reaction-action action-approve border">
      { approves } J'approuve
    </div>

    <div className="reaction-action action-refute border">
      { refutes } Je réfute
    </div>

    <div className="reaction-action action-like border">
      { likes } +1
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

  </div>
);

ReactionActionsNoLogin.propTypes = {
  approves: PropTypes.number.isRequired,
  refutes: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  repliesCount: PropTypes.number.isRequired,
  showReplies: PropTypes.bool.isRequired,
  onShowReplies: PropTypes.func.isRequired,
};

export default ReactionActionsNoLogin;
