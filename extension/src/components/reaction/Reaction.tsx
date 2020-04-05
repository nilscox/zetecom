import React from 'react';

import { Reaction } from 'src/types/Reaction';

import ReactionBody from './ReactionBody';
import ReactionFooter from './ReactionFooter';
import ReactionHeader from './ReactionHeader';

import { Paper } from '@material-ui/core';

type ReactionProps = {
  reaction: Reaction;
  displayReplies: boolean;
  toggleReplies: () => void | null;
  displayReplyForm: boolean;
  onReply: () => void;
  onEdit?: () => void;
  onViewHistory: () => void;
  onReport: () => void;
};

const ReactionComponent: React.FC<ReactionProps> = ({
  reaction,
  displayReplies,
  toggleReplies,
  displayReplyForm,
  onReply,
  onEdit,
  onViewHistory,
  onReport,
}) => (
  <Paper elevation={2} id={`reaction-${reaction.id}`}>
    <ReactionHeader {...reaction} onEdit={onEdit} onViewHistory={onViewHistory} onReport={onReport} />
    <ReactionBody {...reaction} />
    <ReactionFooter
      reaction={reaction}
      displayReplies={displayReplies}
      toggleReplies={toggleReplies}
      displayReplyForm={displayReplyForm}
      onReply={onReply}
    />
  </Paper>
);

export default ReactionComponent;
