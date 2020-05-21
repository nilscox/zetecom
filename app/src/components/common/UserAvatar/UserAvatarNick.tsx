import React from 'react';

import UserAvatar from 'src/components/common/UserAvatar';
import { UserLight } from 'src/types/User';

import { Grid, makeStyles, Typography } from '@material-ui/core';

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
  small?: boolean;
  user: UserLight;
};

const UserAvatarNick: React.FC<UserAvatarNickProps> = ({ small, user }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <UserAvatar editable small={small} user={user} />
      <Grid item>
        <Typography className={classes.nick}>
          { user.nick }
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserAvatarNick;
