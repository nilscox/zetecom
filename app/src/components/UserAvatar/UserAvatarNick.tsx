import React from 'react';

import { Grid, makeStyles, Typography } from '@material-ui/core';

import UserAvatar from 'src/components/UserAvatar';
import { UserLight } from 'src/types/User';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  nick: {
    fontWeight: 'bold',
    marginLeft: spacing(2),
    [breakpoints.down('xs')]: {
      marginLeft: spacing(1),
    },
  },
}));

type UserAvatarNickProps = {
  className?: string;
  small?: boolean;
  user: UserLight;
};

const UserAvatarNick: React.FC<UserAvatarNickProps> = ({ className, small, user }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" className={className}>
      <UserAvatar editable small={small} user={user} />
      <Grid item>
        <Typography className={classes.nick}>{user.nick}</Typography>
      </Grid>
    </Grid>
  );
};

export default UserAvatarNick;
