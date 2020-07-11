import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import clsx from 'clsx';

import { trackLogout } from 'src/utils/track';

import { useNotifications } from '../../contexts/NotificationsContext';
import { useUser } from '../../contexts/UserContext';
import useAxios from '../../hooks/use-axios';
import { User } from '../../types/User';
import RouterLink from '../Link';
import UserAvatar from '../UserAvatar';

import {
  Badge,
  Grid,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
} from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SignoutIcon from '@material-ui/icons/ExitToApp';
import NotificationIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(({ palette }) => ({
  userMenuButton: {
    cursor: 'pointer',
    transition: 'color 200ms ease-in-out',
    '&:hover': {
      color: palette.secondary.light,
    },
  },
  nick: {
    fontWeight: 600,
  },
  notificationsActive: {
    color: palette.primary.main,
    fontWeight: 600,
  },
  logout: {
    color: palette.secondary.main,
  },
}));

type UserMenuProps = MenuProps & {
  onClose: () => void;
};

const UserMenu: React.FC<UserMenuProps> = ({ onClose, ...props }) => {
  const [, setUser] = useUser();
  const { count: notificationsCount } = useNotifications();
  const hasNotifications = notificationsCount > 0;
  const classes = useStyles();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/logout' };
  const [{ error, loading, status }, logout] = useAxios(opts, () => undefined, { manual: true });

  if (error)
    throw error;

  useEffect(() => {
    if (status(204)) {
      setUser(null);
      trackLogout('app');
    }
  }, [status, setUser]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
      {...props}
    >

      <MenuItem
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

      <MenuItem
        component={RouterLink}
        focusColor={false}
        to="/mes-commentaires"
        onClick={onClose}
      >
        <ListItemIcon>
          <CommentIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Mes commentaires" />
      </MenuItem>

      <MenuItem onClick={handleLogout} className={classes.logout}>
        <ListItemIcon>
          <SignoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Déconnexion" />
      </MenuItem>

    </Menu>
  );
};

type AuthenticatedUserMenuProps = {
  user: User | null;
};

const AuthenticatedUserMenu: React.FC<AuthenticatedUserMenuProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userMenuAnchor = useRef<HTMLDivElement>(null);
  const { count: notificationsCount } = useNotifications();
  const classes = useStyles();

  return (
    <>

      <Grid container justify="flex-end">
        <Grid item>
          <Grid
            container
            ref={userMenuAnchor}
            direction="column"
            alignItems="center"
            className={classes.userMenuButton}
            onClick={() => setMenuOpen(true)}
          >

            <Badge badgeContent={notificationsCount} color="primary">
              <UserAvatar user={user} />
            </Badge>

            <Typography className={classes.nick}>{ user.nick }</Typography>

          </Grid>
        </Grid>
      </Grid>

      <UserMenu
        open={menuOpen}
        anchorEl={userMenuAnchor.current}
        onClose={() => setMenuOpen(false)}
      />

    </>
  );
};

export default AuthenticatedUserMenu;
