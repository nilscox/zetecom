import React from 'react';

import { User } from 'src/types/User';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu';

type UserMenuProps = {
  loading: boolean;
  user: User | null;
  notificationsCount?: number;
  onLogout?: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ loading, user, notificationsCount, onLogout }) => {
  if (user && onLogout) {
    return (
      <AuthenticatedUserMenu
        loading={loading}
        user={user}
        notificationsCount={notificationsCount}
        onLogout={onLogout}
      />
    );
  }

  return <UnauthenticatedUserMenu />;
};

export default UserMenu;
