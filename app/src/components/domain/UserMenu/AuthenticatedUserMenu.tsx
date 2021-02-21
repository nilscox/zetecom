import React, { forwardRef } from 'react';

import styled from '@emotion/styled';

import AvatarImage from 'src/components/elements/AvatarImage/AvatarImage';
import Icon from 'src/components/elements/Icon/Icon';
import Menu, { MenuItem } from 'src/components/elements/Menu/Menu';
import { Comment, DoneAll, Logout, Notification } from 'src/components/icons';
import { color, fontWeight, size, spacing, textColor } from 'src/theme';
import { User } from 'src/types/User';

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
};

const AvatarNick = forwardRef<HTMLButtonElement, AvatarNickProps>(({ loading, user, ...props }, ref) => (
  <AvatarNickContainer ref={ref} {...props}>
    <AvatarImage loading={loading} src={user.avatar} />
    {user.nick}
  </AvatarNickContainer>
));

AvatarNick.displayName = 'AvatarNick';

const MenuIcon = styled(Icon)`
  margin-right: ${spacing(2)};
  color: ${color('icon')};
`;

type AuthenticatedUserMenuProps = {
  loading: boolean;
  user: User;
  onLogout: () => void;
};

const AuthenticatedUserMenu: React.FC<AuthenticatedUserMenuProps> = ({ loading, user, onLogout }) => (
  <Menu menuButton={<AvatarNick loading={loading} user={user} />}>
    <MenuItem>
      <MenuIcon as={Notification} />
      Notifications
    </MenuItem>

    <MenuItem>
      <MenuIcon as={Comment} />
      Mes commentaires
    </MenuItem>

    <MenuItem>
      <MenuIcon as={DoneAll} />
      Modération
    </MenuItem>

    <MenuItem onClick={onLogout}>
      <MenuIcon as={Logout} />
      Déconnexion
    </MenuItem>
  </Menu>
);

export default AuthenticatedUserMenu;
