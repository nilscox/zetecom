import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

import { Comment, ReactionType } from 'src/types/Comment';

import { useCurrentUser } from '../../../contexts/UserContext';

import Reaction from './Reaction';

const useStyles = makeStyles(({ palette }) => ({
  vbreak: {
    borderRight: `1px solid ${palette.divider}`,
  },
}));

type ReactionsProps = {
  comment: Comment;
  onSetReaction?: (type: ReactionType | null) => void;
};

const Reactions: React.FC<ReactionsProps> = ({ comment, onSetReaction }) => {
  const user = useCurrentUser();
  const classes = useStyles();

  return (
    <Grid container>
      {[ReactionType.APPROVE, ReactionType.REFUTE, ReactionType.SKEPTIC].map((type) => (
        <React.Fragment key={type}>
          <Reaction
            type={type}
            count={comment.reactionsCount[type]}
            userReaction={comment.userReaction === type}
            onUpdate={user && comment.author.id !== user?.id ? onSetReaction : undefined}
          />
          <div className={classes.vbreak} />
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default Reactions;
