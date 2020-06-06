import React from 'react';

import { User } from '../../types/User';
import RouterLink from '../Link';
import { CircleAvatarIwage } from '../UserAvatar/CircleAvatarImage';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';

import defaultAvatar from '../UserAvatar/default-avatar.png';

import { Grid, Typography } from '@material-ui/core';

type UserMenuProps = {
  user: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

  if (user)
    return <AuthenticatedUserMenu user={user} />;

  return (
    <RouterLink to="/connexion">
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
