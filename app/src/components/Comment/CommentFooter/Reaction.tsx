import React from 'react';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import Button from 'src/components/Button';
import { ReactionType } from 'src/types/Comment';

import approveIcon from './images/approve.png';
import refuteIcon from './images/refute.png';
import skepticIcon from './images/skeptic.png';

type StylesProps = {
  userReaction?: boolean;
};

const useStyles = makeStyles(({ breakpoints, spacing, palette: { selected, text } }) => ({
  button: ({ userReaction }: StylesProps) => ({
    padding: spacing(1),
    fontWeight: 'normal',
    fontSize: '1rem',
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
      color: text.disabled,
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

const reactionIcon = {
  [ReactionType.APPROVE]: approveIcon,
  [ReactionType.REFUTE]: refuteIcon,
  [ReactionType.SKEPTIC]: skepticIcon,
};

export type ReactionProps = {
  count: number;
  type: ReactionType;
  userReaction?: boolean;
  onUpdate?: (type: ReactionType | null) => void;
};

const Reaction: React.FC<ReactionProps> = ({ count, type, userReaction, onUpdate }) => {
  const classes = useStyles({ userReaction });

  return (
    <Button
      type="button"
      disabled={!onUpdate}
      title={onUpdate && reactionTraduction[type]}
      className={clsx('reaction', 'reaction--' + type, userReaction && 'user-reaction', classes.button)}
      classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
      onClick={() => onUpdate(userReaction ? null : type)}
    >
      <img src={reactionIcon[type]} className={classes.image} />
      <span className={classes.count}>{count}</span>
    </Button>
  );
};

export default Reaction;
