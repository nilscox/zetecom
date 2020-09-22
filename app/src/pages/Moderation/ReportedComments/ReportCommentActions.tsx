import React from 'react';

import { Button, ButtonGroup, makeStyles } from '@material-ui/core';

import { Comment } from '../../../types/Comment';

const useStyles = makeStyles(({ palette }) => ({
  discard: {
    color: palette.textLight.main,
  },
  contact: {
    color: palette.textLight.main,
  },
  delete: {
    color: palette.error.dark,
  },
}));

type ReportCommentActionsProps = {
  comment: Comment;
};

const ReportCommentActions: React.FC<ReportCommentActionsProps> = ({ comment }) => {
  const classes = useStyles();

  return (
    <ButtonGroup>
      <Button size="large" className={classes.discard}>Ignorer</Button>
      <Button size="large" className={classes.contact}>Contacter {comment.author.nick}</Button>
      <Button size="large" className={classes.delete}>Supprimer le commentaire</Button>
    </ButtonGroup>
  );
};

export default ReportCommentActions;
