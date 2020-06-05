import React from 'react';

import { useCurrentUser } from '../contexts/UserContext';

import RouterLink from './Link';

import { IconButton, makeStyles } from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(({ palette }) => ({
  accountIcon: {
    color: palette.grey[600],
  },
}));

type UserMenuProps = {

};

const UserMenu: React.FC<UserMenuProps> = () => {
  const user = useCurrentUser();
  const classes = useStyles();

  if (user) {
    //
    return null;
  }

  return (
    <IconButton edge="end" color="secondary" disabled={!!user}>
      <RouterLink to="/connexion">
        <AccountIcon fontSize="large" color="secondary" className={classes.accountIcon} />
      </RouterLink>
    </IconButton>
  );
};

export default UserMenu;
