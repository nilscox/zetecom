import React from 'react';

import { User } from 'src/types/User';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu';

type UserMenuProps = {
  loading: boolean;
  user: User | null;
  onLogout?: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ loading, user, onLogout }) => {
  if (user && onLogout) {
    return <AuthenticatedUserMenu loading={loading} user={user} onLogout={onLogout} />;
  }

  return <UnauthenticatedUserMenu />;
};

export default UserMenu;
