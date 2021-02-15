import React from 'react';

import { User } from 'src/types/User';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu';

type UserMenuProps = {
  user?: User;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return user ? <AuthenticatedUserMenu user={user} /> : <UnauthenticatedUserMenu />;
};

export default UserMenu;
