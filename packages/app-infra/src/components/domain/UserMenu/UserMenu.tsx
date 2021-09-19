import { forwardRef } from 'react';

import styled from '@emotion/styled';
import {
  AuthenticatedUser,
  logout,
  selectAuthenticatedUser,
  selectIsFetchingAuthenticatedUser,
  selectNotificationsBadge,
  User,
  UserRole,
} from '@zetecom/app-core';
import { useDispatch } from 'react-redux';

import { Avatar } from '~/components/elements/Avatar/Avatar';
import { Icon } from '~/components/elements/Icon/Icon';
import { Link } from '~/components/elements/Link/Link';
import { Menu, MenuItem } from '~/components/elements/Menu/Menu';
import { DoneAll, Logout, Notification } from '~/components/icons';
import { useAppSelector } from '~/hooks/useAppSelector';
import { color, fontWeight, spacing } from '~/theme';

export const UserMenu: React.FC = () => {
  const dispatch = useDispatch();

  const user = useAppSelector(selectAuthenticatedUser);
  const isFetchingAuthenticatedUser = useAppSelector(selectIsFetchingAuthenticatedUser);

  if (!user) {
    // @ts-expect-error todo: find a way to be typesafe with the polymorphic "as" prop
    return <AvatarNick as={Link} to="/connexion" nick="Connexion" loading={isFetchingAuthenticatedUser} />;
  }

  return <AuthUserMenu user={user} onLogout={() => dispatch(logout())} />;
};

type AvatarNickProps = React.ComponentProps<typeof AvatarNickContainer> & {
  user?: User;
  nick: string;
  loading?: boolean;
  badge?: string;
};

const AvatarNick = forwardRef<HTMLDivElement, AvatarNickProps>(({ user, nick, badge, loading, ...props }, ref) => (
  <AvatarNickContainer {...props} ref={ref}>
    <Avatar user={user} badge={badge} loading={loading} />
    {nick}
  </AvatarNickContainer>
));

const AvatarNickContainer = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${fontWeight('medium')};
  color: ${color('textLight')};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

type AuthUserMenuProps = {
  user: AuthenticatedUser;
  onLogout: () => void;
};

const AuthUserMenu: React.FC<AuthUserMenuProps> = ({ user, onLogout }) => {
  const badge = useAppSelector(selectNotificationsBadge);

  const avatarNick = <AvatarNick role="button" user={user} nick={user.nick} badge={badge} />;

  return (
    <Menu menuButton={avatarNick}>
      <MenuItem>
        <MenuLink to="/notifications">
          <MenuIcon as={Notification} />
          Notifications
        </MenuLink>
      </MenuItem>

      {[UserRole.moderator, UserRole.admin].includes(user.role) && (
        <MenuItem>
          <MenuLink to="/moderation">
            <MenuIcon as={DoneAll} />
            Modération
          </MenuLink>
        </MenuItem>
      )}

      <MenuItem onClick={onLogout}>
        <MenuIcon as={Logout} />
        Déconnexion
      </MenuItem>
    </Menu>
  );
};

const MenuIcon = styled(Icon)`
  margin-right: ${spacing(2)};
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
`;
