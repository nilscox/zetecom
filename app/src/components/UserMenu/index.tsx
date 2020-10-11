import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import { User } from '../../types/User';
import RouterLink from '../Link';
import { CircleAvatarIwage } from '../UserAvatar/CircleAvatarImage';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';

import defaultAvatar from '../UserAvatar/default-avatar.png';

type UserMenuProps = {
  user: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  if (user) {
    return <AuthenticatedUserMenu user={user} />;
  }

  return (
    <RouterLink focusColor={false} to="/connexion">
      <Grid container direction="column" alignItems="center">
        <CircleAvatarIwage src={defaultAvatar} />
        <Grid item>
          <Typography style={{ fontWeight: 600 }}>
            Conexion
          </Typography>
        </Grid>
      </Grid>
    </RouterLink>
  );
};

export default UserMenu;
