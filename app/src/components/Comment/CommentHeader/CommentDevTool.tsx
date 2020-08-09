import React from 'react';

import { Comment } from 'src/types/Comment';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  container: {
    height: '100%',
    marginLeft: spacing(2),
    borderLeft: `2px solid ${palette.border.main}`,
    paddingLeft: spacing(2),
    fontFamily: '"Courier new", monospace',
    transition: 'opacity 220ms ease-in-out',
    opacity: .7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

type CommentDevToolProps = {
  comment: Comment;
};

const CommentDevTool: React.FC<CommentDevToolProps> = ({ comment }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={classes.container}>
      <Grid item>
        #{comment.id} - score = {comment.score}
      </Grid>
    </Grid>
  );
};

export default CommentDevTool;
