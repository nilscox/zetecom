import React from 'react';

import { User } from 'src/types/User';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu';

type UserMenuProps = {
  user?: User | null;
  onLogout?: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  return user && onLogout ? <AuthenticatedUserMenu user={user} onLogout={onLogout} /> : <UnauthenticatedUserMenu />;
};

export default UserMenu;
