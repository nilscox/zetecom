import React from 'react';

import { Comment } from 'src/types/Comment';

import CommentBody from './CommentBody';
import CommentFooter from './CommentFooter';
import CommentHeader from './CommentHeader';

import { Paper, Theme, useMediaQuery } from '@material-ui/core';

export type CommentComponentProps = {
  comment: Comment;
  displayReplies: boolean;
  displayReplyForm: boolean;
  toggleReplies: () => void | null;
  onReply: () => void;
  onEdit?: () => void;
  onViewHistory: () => void;
  onReport: () => void;
};

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  displayReplies,
  displayReplyForm,
  toggleReplies,
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
        displayReplies={displayReplies}
        displayReplyForm={displayReplyForm}
        toggleReplies={toggleReplies}
        onReply={onReply}
      />

    </Paper>
  );
};

export default CommentComponent;
