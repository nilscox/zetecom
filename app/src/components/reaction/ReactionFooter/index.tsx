import React from 'react';

import { Reaction } from 'src/types/Reaction';

import QuickReactions from './QuickReactions';
import RepliesButton from './RepliesButton';
import ReplyButton from './ReplyButton';
import SubscribeButton from './SubscribeButton';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette: { border } }) => ({
  container: {
    borderTop: `1px solid ${border.light}`,
  },
}));

type ReactionFooterProps = {
  reaction: Reaction;
  displayReplies: boolean;
  toggleReplies: () => void | null;
  displayReplyForm: boolean;
  onReply: () => void;
};

const ReactionFooter: React.FC<ReactionFooterProps> = ({
  reaction,
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
            <QuickReactions reaction={reaction} />
          </Grid>
          <RepliesButton repliesCount={reaction.repliesCount} displayReplies={displayReplies} onClick={toggleReplies} />
        </Grid>
      </Grid>

      <Grid item>
        <Grid container style={{ height: '100%' }}>
          <SubscribeButton reaction={reaction} />
          <ReplyButton disabled={displayReplyForm} onReply={onReply} />
        </Grid>
      </Grid>

    </Grid>
  );
};

export default ReactionFooter;
