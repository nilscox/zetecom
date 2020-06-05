import React, { useRef, useState } from 'react';

import { useNotifications } from '../../contexts/NotificationsContext';
import { User } from '../../types/User';
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
import clsx from 'clsx';

const useStyles = makeStyles(({ palette }) => ({
  userMenuButton: {
    cursor: 'pointer',
  },
  nick: {
    fontWeight: 600,
  },
  notificationsActive: {
    color: palette.primary.main,
    fontWeight: 600,
  },
}));

const UserMenu: React.FC<MenuProps> = (props) => {
  const { count: notificationsCount } = useNotifications();
  const hasNotifications = notificationsCount > 0;
  const classes = useStyles();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      {...props}
    >

      <MenuItem className={clsx(hasNotifications && classes.notificationsActive)}>
        <ListItemIcon>
          <NotificationIcon fontSize="small" color={hasNotifications ? 'primary' : 'inherit'} />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <CommentIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Mes commentaires" />
      </MenuItem>

      <MenuItem>
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
