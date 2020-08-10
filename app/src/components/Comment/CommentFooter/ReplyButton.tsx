import React from 'react';

import { Button, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';

import { useCurrentUser } from 'src/contexts/UserContext';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  button: {
    marginRight: spacing(2),
    [breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  buttonText: {
    padding: spacing(0, 1),
  },
  iconSizeSmall: {
    padding: spacing(0, 1),
    fontSize: spacing(5),
    '& svg': {
      fontSize: 'inherit',
    },
  },
}));

type ReplyButtonProps = {
  disabled: boolean;
  onReply: () => void;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ disabled, onReply }) => {
  const user = useCurrentUser();

  const verySmall = useMediaQuery('(max-width: 360px)');
  const classes = useStyles();

  if (!user)
    return null;

  if (verySmall) {
    return (
      <IconButton disabled={disabled} size="small" classes={{ sizeSmall: classes.iconSizeSmall }} onClick={onReply}>
        <ReplyIcon />
      </IconButton>
    );
  }

  return (
    <Button disabled={disabled} className={classes.button} classes={{ text: classes.buttonText }} onClick={onReply}>
      Répondre
    </Button>
  );
};

export default ReplyButton;
