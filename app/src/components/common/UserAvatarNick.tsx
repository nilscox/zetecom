import React from 'react';

import UserAvatar from 'src/components/common/UserAvatar';
import { UserLight } from 'src/types/User';

import { Box, Grid, Typography } from '@material-ui/core';

type UserAvatarNickProps = {
  small?: boolean;
  user: UserLight;
};

const UserAvatarNick: React.FC<UserAvatarNickProps> = ({ small, user }) => (
  <Grid container alignItems="center">
    <UserAvatar editable small={small} user={user} />
    <Grid item>
      <Box ml={1}>
        <Typography variant="body2">
          { user.nick }
        </Typography>
      </Box>
    </Grid>
  </Grid>
);

export default UserAvatarNick;
