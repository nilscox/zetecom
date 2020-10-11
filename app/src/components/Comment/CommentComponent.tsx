import React from 'react';

import { Paper, Theme, useMediaQuery } from '@material-ui/core';

import { Comment, ReactionType } from 'src/types/Comment';

import CommentBody from './CommentBody';
import CommentFooter from './CommentFooter';
import CommentHeader from './CommentHeader';

export type CommentComponentProps = {
  comment: Comment;
  displayReplies?: boolean;
  displayReplyForm?: boolean;
  loadingReplies?: boolean;
  onSetReaction?: (type: ReactionType | null) => void;
  onToggleReplies?: () => void;
  onToggleSubscription?: () => void;
  onEdit?: () => void;
  onReply?: () => void;
  onViewHistory?: () => void;
  onReport?: () => void;
};

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  displayReplies,
  displayReplyForm,
  loadingReplies,
  onSetReaction,
  onToggleReplies,
  onToggleSubscription,
  onReply,
  onEdit,
  onViewHistory,
  onReport,
}) => {
  const small = useMediaQuery<Theme>(theme => theme.breakpoints.down('xs'));

  return (
    <Paper elevation={small ? 1 : 2}>
      <CommentHeader comment={comment} onEdit={onEdit} onViewHistory={onViewHistory} onReport={onReport} />

      <CommentBody {...comment} />

      <CommentFooter
        comment={comment}
        displayReplies={Boolean(displayReplies)}
        displayReplyForm={Boolean(displayReplyForm)}
        loadingReplies={Boolean(loadingReplies)}
        onSetReaction={onSetReaction}
        onToggleReplies={onToggleReplies}
        onToggleSubscription={onToggleSubscription}
        onReply={onReply}
      />
    </Paper>
  );
};

export default CommentComponent;
