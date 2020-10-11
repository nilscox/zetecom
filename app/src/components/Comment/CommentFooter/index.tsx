import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import { Comment, ReactionType } from 'src/types/Comment';

import Reactions from './Reactions';
import RepliesButton from './RepliesButton';
import ReplyButton from './ReplyButton';
import SubscribeButton from './SubscribeButton';

const useStyles = makeStyles(({ palette: { border } }) => ({
  container: {
    borderTop: `1px solid ${border.main}`,
    background: 'rgba(0, 0, 0, 0.03)',
  },
}));

type CommentFooterProps = {
  comment: Comment;
  displayReplies: boolean;
  displayReplyForm: boolean;
  loadingReplies: boolean;
  onSetReaction?: (type: ReactionType | null) => void;
  onToggleReplies?: () => void;
  onToggleSubscription?: () => void;
  onReply?: () => void;
};

const CommentFooter: React.FC<CommentFooterProps> = ({
  comment,
  displayReplies,
  displayReplyForm,
  loadingReplies,
  onSetReaction,
  onToggleReplies,
  onReply,
  onToggleSubscription,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item style={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item>
            <Reactions comment={comment} onSetReaction={onSetReaction} />
          </Grid>

          <RepliesButton
            loading={loadingReplies}
            repliesCount={comment.repliesCount}
            displayReplies={displayReplies}
            onClick={onToggleReplies}
          />
        </Grid>
      </Grid>

      <Grid item>
        <Grid container style={{ height: '100%' }}>
          <SubscribeButton comment={comment} toggleSubscription={onToggleSubscription} />
          <ReplyButton disabled={displayReplyForm} onReply={onReply} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentFooter;
