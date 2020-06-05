import React, { useRef, useState } from 'react';

import { User } from '../../types/User';
import RouterLink from '../Link';
import UserAvatar from '../UserAvatar';

import {
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import SignoutIcon from '@material-ui/icons/ExitToApp';
import NotificationIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(({ palette }) => ({
  userMenuButton: {
    cursor: 'pointer',
  },
  nick: {
    fontWeight: 600,
  },
  accountIcon: {
    color: palette.grey[600],
  },
}));

type UserMenuProps = {
  user: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userMenuAnchor = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  if (user) {
    const UserMenu = () => (
      <Menu
        open={menuOpen}
        anchorEl={userMenuAnchor.current}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setMenuOpen(false)}
      >

        <MenuItem>
          <ListItemIcon>
            <NotificationIcon fontSize="small" />
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
              <UserAvatar user={user} />
              <Typography className={classes.nick}>{ user.nick }</Typography>
            </Grid>
          </Grid>
        </Grid>
        <UserMenu />
      </>
    );
  }

  return (
    <IconButton edge="end" color="secondary" disabled={!!user}>
      <RouterLink to="/connexion">
        <AccountIcon fontSize="large" color="secondary" className={classes.accountIcon} />
      </RouterLink>
    </IconButton>
  );
};

export default UserMenu;
