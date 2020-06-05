import React from 'react';

import { User } from '../../types/User';
import RouterLink from '../Link';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';

import { IconButton, makeStyles } from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(({ palette }) => ({
  accountIcon: {
    color: palette.grey[600],
  },
}));

type UserMenuProps = {
  user: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const classes = useStyles();

  if (user)
    return <AuthenticatedUserMenu user={user} />;

  return (
    <IconButton edge="end" color="secondary" disabled={!!user}>
      <RouterLink to="/connexion">
        <AccountIcon fontSize="large" color="secondary" className={classes.accountIcon} />
      </RouterLink>
    </IconButton>
  );
};

export default UserMenu;
