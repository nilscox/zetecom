import React from 'react';

import RouterLink from 'src/components/Link';
import { useCurrentUser } from 'src/hooks/use-user';
import WebsiteLink from 'src/popup/components/WebsiteLink';

import { drawerWidth } from '../Drawer';

import NotificationsIcon from './NotificationsIcon';

import MaterialAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/HelpOutline';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: 'inherit',
  },
  appBarLink: {
    display: 'contents',
    color: theme.palette.secondary.main,
  },
}));

type AppBarProps = {
  handleDrawerToggle: () => void;
};

const AppBar: React.FC<AppBarProps> = ({ handleDrawerToggle }) => {
  const user = useCurrentUser();
  const classes = useStyles({});

  return (
    <MaterialAppBar position="fixed" className={classes.appBar}>
      <Toolbar>

        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography className={classes.title} variant="h5" noWrap color="textSecondary">
          <RouterLink to="/" className={classes.titleLink}>
            Réagir à l'information
          </RouterLink>
        </Typography>

        <IconButton color="secondary">
          <WebsiteLink to="/faq.html" className={classes.appBarLink}>
            <HelpIcon />
          </WebsiteLink>
        </IconButton>

        <IconButton color="secondary" disabled={!user}>
          <RouterLink to="/notifications" className={classes.appBarLink}>
            <NotificationsIcon />
          </RouterLink>
        </IconButton>

        <IconButton edge="end" color="secondary" disabled={!!user}>
          <RouterLink to="/connexion" className={classes.appBarLink}>
            <AccountIcon />
          </RouterLink>
        </IconButton>

      </Toolbar>
    </MaterialAppBar>
  );
};

export default AppBar;
