import React, { forwardRef } from 'react';

import styled from '@emotion/styled';

import AvatarImage from 'src/components/elements/AvatarImage/AvatarImage';
import Badge from 'src/components/elements/Badge/Badge';
import Icon from 'src/components/elements/Icon/Icon';
import Link from 'src/components/elements/Link/Link';
import Menu, { MenuItem } from 'src/components/elements/Menu/Menu';
import { DoneAll, Logout, Notification } from 'src/components/icons';
import { color, fontWeight, size, spacing, textColor } from 'src/theme';
import { Role, User } from 'src/types/User';

const AvatarNickContainer = styled.button`
  width: ${size('small')};
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${fontWeight('bold')};
  color: ${textColor('default')};
  cursor: pointer;

  img {
    margin-bottom: ${spacing(0.5)};
  }
`;

type AvatarNickProps = React.ComponentProps<typeof AvatarNickContainer> & {
  loading: boolean;
  user: User;
  notificationsCount?: number;
};

const AvatarNick = forwardRef<HTMLButtonElement, AvatarNickProps>(
  ({ loading, user, notificationsCount, ...props }, ref) => (
    <AvatarNickContainer ref={ref} {...props}>
      <Badge value={notificationsCount || undefined}>
        <AvatarImage loading={loading} src={user.avatar} />
      </Badge>
      {user.nick}
    </AvatarNickContainer>
  ),
);

AvatarNick.displayName = 'AvatarNick';

const MenuIcon = styled(Icon)`
  margin-right: ${spacing(2)};
  color: ${color('icon')};
`;

const MenuItemLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
`;

type AuthenticatedUserMenuProps = {
  loading: boolean;
  user: User;
  notificationsCount?: number;
  onLogout: () => void;
};

const AuthenticatedUserMenu: React.FC<AuthenticatedUserMenuProps> = ({
  loading,
  user,
  notificationsCount,
  onLogout,
}) => (
  <Menu menuButton={<AvatarNick loading={loading} user={user} notificationsCount={notificationsCount} />}>
    <MenuItem>
      <MenuItemLink to="/notifications">
        <MenuIcon as={Notification} />
        Notifications
      </MenuItemLink>
    </MenuItem>

    {user.roles.includes(Role.MODERATOR) && (
      <MenuItem>
        <MenuItemLink to="/moderation">
          <MenuIcon as={DoneAll} />
          Modération
        </MenuItemLink>
      </MenuItem>
    )}

    <MenuItem onClick={onLogout}>
      <MenuIcon as={Logout} />
      Déconnexion
    </MenuItem>
  </Menu>
);

export default AuthenticatedUserMenu;
