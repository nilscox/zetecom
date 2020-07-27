import React from 'react';

import { Comment } from 'src/types/Comment';

import Reactions from './Reactions';
import RepliesButton from './RepliesButton';
import ReplyButton from './ReplyButton';
import SubscribeButton from './SubscribeButton';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette: { border } }) => ({
  container: {
    borderTop: `1px solid ${border.light}`,
    background: 'rgba(0, 0, 0, 0.03)',
  },
}));

type CommentFooterProps = {
  comment: Comment;
  displayReplies: boolean;
  toggleReplies: () => void | null;
  displayReplyForm: boolean;
  onReply: () => void;
};

const CommentFooter: React.FC<CommentFooterProps> = ({
  comment,
  displayReplies,
  toggleReplies,
  displayReplyForm,
  onReply,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>

      <Grid item style={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item>
            <Reactions comment={comment} />
          </Grid>
          <RepliesButton repliesCount={comment.repliesCount} displayReplies={displayReplies} onClick={toggleReplies} />
        </Grid>
      </Grid>

      <Grid item>
        <Grid container style={{ height: '100%' }}>
          <SubscribeButton comment={comment} />
          <ReplyButton disabled={displayReplyForm} onReply={onReply} />
        </Grid>
      </Grid>

    </Grid>
  );
};

export default CommentFooter;
