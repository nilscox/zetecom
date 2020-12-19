import React from 'react';

import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Button from 'src/components/Button';

const useStyles = makeStyles<Theme, { displayReplies?: boolean }>(({ palette, breakpoints, spacing }) => ({
  button: {
    padding: spacing(0, 2),
    color: palette.text.secondary,
  },
  buttonLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  repliesCount: {
    fontWeight: 'bold',
    [breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  arrow: ({ displayReplies }) => ({
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
  loading?: boolean;
  repliesCount: number;
  displayReplies: boolean;
  onClick?: () => void;
};

const RepliesButton: React.FC<RepliesButtonProps> = ({ loading, repliesCount, displayReplies, onClick }) => {
  const classes = useStyles({ displayReplies });
  const verySmall = useMediaQuery('(max-width: 320px)');

  return (
    <Button
      disabled={loading || !onClick || repliesCount === 0}
      loading={loading}
      className={classes.button}
      classes={{ label: classes.buttonLabel }}
      onClick={onClick}
    >
      {(repliesCount > 0 || !verySmall) && (
        <>
          {repliesCount} {!verySmall && <>réponse{repliesCount > 1 ? 's' : ''}</>}
        </>
      )}

      {repliesCount > 0 && onClick && <ArrowRightIcon className={classes.arrow} />}
    </Button>
  );
};

export default RepliesButton;
