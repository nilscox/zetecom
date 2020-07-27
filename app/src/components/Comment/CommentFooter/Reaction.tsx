import React from 'react';

import clsx from 'clsx';

import { ReactionType } from 'src/types/Comment';

import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

type StylesProps = {
  userReaction?: boolean;
}

const useStyles = makeStyles(({ breakpoints, spacing, palette: { selected, text } }) => ({
  button: ({ userReaction }: StylesProps) => ({
    padding: spacing(1, 2),
    fontWeight: 'normal',
    ...(userReaction && {
      fontWeight: 'bold',
      backgroundColor: selected.main,
    }),
    [breakpoints.down('xs')]: {
      padding: spacing(0.5, 1),
    },
  }),
  buttonRoot: {
    '&$disabled': {
      color: text.secondary,
    },
  },
  disabled: {},
  image: {
    width: spacing(6),
    height: spacing(6),
    [breakpoints.down('xs')]: {
      width: spacing(4),
      height: spacing(4),
    },
  },
  count: {
    fontWeight: 'bold',
    marginLeft: spacing(2),
    [breakpoints.down('xs')]: {
      marginLeft: spacing(1),
    },
  },
}));

const reactionTraduction = {
  [ReactionType.APPROVE]: 'Approuver',
  [ReactionType.REFUTE]: 'Réfuter',
  [ReactionType.SKEPTIC]: 'Sceptique',
};

export type ReactionProps = {
  icon: string;
  count: number;
  type: ReactionType;
  userReaction?: boolean;
  onClick?: () => void;
};

const Reaction: React.FC<ReactionProps> = ({ icon, count, type, userReaction, onClick }) => {
  const classes = useStyles({ userReaction });

  return (
    <Button
      type="button"
      disabled={!onClick}
      title={reactionTraduction[type]}
      className={clsx(
        'quick-comment',
        'quick-comment--' + type,
        userReaction && 'user-quick-comment',
        classes.button,
      )}
      classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
      onClick={() => onClick && onClick()}
    >

      <Grid container alignItems="center">
        <img src={icon} className={classes.image} />
        <Typography className={classes.count}>{ count }</Typography>
      </Grid>

    </Button>
  );
};

export default Reaction;
