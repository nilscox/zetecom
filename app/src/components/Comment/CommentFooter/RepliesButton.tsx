import React from 'react';

import { Button, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  buttonText: {
    padding: spacing(0, 2),
    [breakpoints.down('xs')]: {
      padding: spacing(0, 1),
    },
  },
  repliesCount: {
    fontWeight: 'bold',
    [breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  arrow: (displayReplies: boolean) => ({
    transform: `rotate(${displayReplies ? 90 : 0}deg)`,
    transition: 'transform 200ms ease-in-out',
    color: 'inherit',
    marginLeft: spacing(1),
    fontSize: spacing(6),
    [breakpoints.down('xs')]: {
      marginLeft: 0,
      fontSize: spacing(4),
    },
  }),
}));

type RepliesButtonProps = {
  repliesCount: number;
  displayReplies: boolean;
  onClick?: () => void;
};

const RepliesButton: React.FC<RepliesButtonProps> = ({ repliesCount, displayReplies, onClick }) => {
  const classes = useStyles(displayReplies);
  const verySmall = useMediaQuery('(max-width: 320px)');

  return (
    <Button disabled={!onClick || repliesCount === 0} classes={{ text: classes.buttonText }} onClick={onClick}>

      { (repliesCount > 0 || !verySmall) && (
        <Typography variant="button" className={classes.repliesCount}>
          { repliesCount } {!verySmall && <>réponse{ repliesCount > 1 ? 's' : '' }</>}
        </Typography>
      ) }

      { repliesCount > 0 && onClick && (
        <ArrowRightIcon className={classes.arrow} />
      ) }

    </Button>
  );
};

export default RepliesButton;
