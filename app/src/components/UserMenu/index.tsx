import React from 'react';

import { User } from '../../types/User';
import RouterLink from '../Link';
import CircleAvatarImage from '../UserAvatar/CircleAvatarImage';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';
import UserMenuComponent from './UserMenuComponent';

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
      <UserMenuComponent image={<CircleAvatarImage src={defaultAvatar} />} text="Connexion" />
    </RouterLink>
  );
};

export default UserMenu;
