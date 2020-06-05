import React from 'react';

import { User } from '../../types/User';
import RouterLink from '../Link';
import { CircleAvatarIwage } from '../UserAvatar/CircleAvatarImage';

import AuthenticatedUserMenu from './AuthenticatedUserMenu';

import defaultAvatar from '../UserAvatar/default-avatar.png';

type UserMenuProps = {
  user: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

  if (user)
    return <AuthenticatedUserMenu user={user} />;

  return (
    <RouterLink to="/connexion">
      <CircleAvatarIwage src={defaultAvatar} />
    </RouterLink>
  );
};

export default UserMenu;
