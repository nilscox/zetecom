import React from 'react';

import { Reaction } from 'src/types/Reaction';

import ReactionBody from './ReactionBody';
import ReactionFooter from './ReactionFooter';
import ReactionHeader from './ReactionHeader';

import { Paper } from '@material-ui/core';

export type ReactionComponentProps = {
  reaction: Reaction;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void | null;
  onReply: () => void;
  onEdit?: () => void;
  onViewHistory: () => void;
  onReport: () => void;
};

const ReactionComponent: React.FC<ReactionComponentProps> = ({
  reaction,
  displayReplies,
  displayReplyForm,
  toggleReplies,
  onReply,
  onEdit,
  onViewHistory,
  onReport,
}) => {

  return (
    <Paper elevation={2}>

      <ReactionHeader {...reaction} onEdit={onEdit} onViewHistory={onViewHistory} onReport={onReport} />

      <ReactionBody {...reaction} />

      <ReactionFooter
        reaction={reaction}
        displayReplies={displayReplies}
        displayReplyForm={displayReplyForm}
        toggleReplies={toggleReplies}
        onReply={onReply}
      />

    </Paper>
  );
};

export default ReactionComponent;
