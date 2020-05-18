import React from 'react';

import { QuickReactionType } from 'src/types/Reaction';

import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

type StylesProps = {
  hover: boolean;
  userQuickReaction?: boolean;
}

const useStyles = makeStyles(({ breakpoints, spacing, palette: { selected } }) => ({
  button: ({ hover, userQuickReaction }: StylesProps) => ({
    padding: spacing(1, 2),
    fontWeight: 'normal',
    ...(userQuickReaction && {
      fontWeight: 'bold',
      backgroundColor: selected.main,
    }),
    [breakpoints.down('xs')]: {
      padding: spacing(0.5, 1),
    },
  }),
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

const quickReactionTraduction = {
  [QuickReactionType.APPROVE]: 'Approuver',
  [QuickReactionType.REFUTE]: 'Réfuter',
  [QuickReactionType.SKEPTIC]: 'Sceptique',
};

export type QuickReactionProps = {
  icon: string;
  count: number;
  type: QuickReactionType;
  userQuickReaction?: boolean;
  onClick?: () => void;
  hover?: boolean;
};

const QuickReaction: React.FC<QuickReactionProps> = ({ icon, count, type, userQuickReaction, onClick, hover }) => {
  const classes = useStyles({ userQuickReaction, hover });

  return (
    <Button
      type="button"
      disabled={!onClick}
      title={quickReactionTraduction[type]}
      className={classes.button}
      onClick={() => onClick && onClick()}
    >

      <Grid container alignItems="center">
        <img src={icon} className={classes.image} />
        <Typography className={classes.count}>{ count }</Typography>
      </Grid>

    </Button>
  );
};

export default QuickReaction;
