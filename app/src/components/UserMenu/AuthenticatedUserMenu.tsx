import React, { forwardRef, useRef, useState } from 'react';

import { Badge, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import ModerationIcon from '@material-ui/icons/DoneAll';
import SignoutIcon from '@material-ui/icons/ExitToApp';
import NotificationIcon from '@material-ui/icons/Notifications';
import clsx from 'clsx';

import { useNotifications } from '../../contexts/NotificationsContext';
import { Role, User } from '../../types/User';
import RouterLink from '../Link';
import UserAvatar from '../UserAvatar';

import useLogout from './useLogout';
import UserMenuComponent from './UserMenuComponent';

const useStyles = makeStyles(({ palette }) => ({
  userMenuButton: {
    cursor: 'pointer',
  },
  notificationsActive: {
    color: palette.primary.main,
    fontWeight: 600,
  },
  logout: {
    color: palette.secondary.main,
  },
}));

type MenuItemProps = {
  onClose: () => void;
};

const NotificationsMenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(({ onClose }, ref) => {
  const { count: notificationsCount } = useNotifications();
  const classes = useStyles();

  const hasNotifications = notificationsCount > 0;

  return (
    <MenuItem
      ref={ref}
      component={RouterLink}
      focusColor={false}
      to="/notifications"
      className={clsx(hasNotifications && classes.notificationsActive)}
      onClick={onClose}
    >
      <ListItemIcon>
        <NotificationIcon fontSize="small" color={hasNotifications ? 'primary' : 'inherit'} />
      </ListItemIcon>
      <ListItemText primary="Notifications" />
    </MenuItem>
  );
});

NotificationsMenuItem.displayName = 'NotificationsMenuItem';

const UserCommentsMenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(({ onClose }, ref) => (
  <MenuItem ref={ref} component={RouterLink} focusColor={false} to="/mes-commentaires" onClick={onClose}>
    <ListItemIcon>
      <CommentIcon fontSize="small" />
    </ListItemIcon>
    <ListItemText primary="Mes commentaires" />
  </MenuItem>
));

UserCommentsMenuItem.displayName = 'UserCommentsMenuItem';

const ModerationMenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(({ onClose }, ref) => (
  <MenuItem ref={ref} component={RouterLink} focusColor={false} to="/moderation" onClick={onClose}>
    <ListItemIcon>
      <ModerationIcon fontSize="small" />
    </ListItemIcon>
    <ListItemText primary="Modération" />
  </MenuItem>
));

ModerationMenuItem.displayName = 'ModerationMenuItem';

const LogoutMenuItem = forwardRef<HTMLLIElement, MenuItemProps>(({ onClose }, ref) => {
  const logout = useLogout(onClose);
  const classes = useStyles();

  return (
    <MenuItem ref={ref} onClick={() => logout()} className={classes.logout}>
      <ListItemIcon>
        <SignoutIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Déconnexion" />
    </MenuItem>
  );
});

LogoutMenuItem.displayName = 'LogoutMenuItem';

type AuthenticatedUserMenuProps = {
  user: User;
};

const AuthenticatedUserMenu: React.FC<AuthenticatedUserMenuProps> = ({ user }) => {
  const { count: notificationsCount } = useNotifications();
  const userMenuAnchor = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const classes = useStyles();

  const handleClose = () => setMenuOpen(false);

  return (
    <>
      <UserMenuComponent
        ref={userMenuAnchor}
        className={classes.userMenuButton}
        image={
          <Badge badgeContent={notificationsCount || 0} color="primary">
            <UserAvatar user={user} />
          </Badge>
        }
        text={user.nick}
        onClick={() => setMenuOpen(true)}
      />

      <Menu
        open={menuOpen}
        anchorEl={userMenuAnchor.current}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <NotificationsMenuItem onClose={handleClose} />
        <UserCommentsMenuItem onClose={handleClose} />
        {user.roles.includes(Role.MODERATOR) && <ModerationMenuItem onClose={handleClose} />}
        <LogoutMenuItem onClose={handleClose} />
      </Menu>
    </>
  );
};

export default AuthenticatedUserMenu;
