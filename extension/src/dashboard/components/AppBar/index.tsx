import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/HelpOutline';

import NotificationsIcon from './NotificationsIcon';
import RouterLink, { Link } from 'src/components/common/Link';
import { drawerWidth } from '../Drawer';

const { WEBSITE_URL } = process.env;

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

        <IconButton
          color="secondary"
        >
          <Link openInNewTab href={`${WEBSITE_URL}/faq.html`} className={classes.appBarLink}>
            <HelpIcon />
          </Link>
        </IconButton>

        <IconButton
          color="secondary"
        >
          <RouterLink to="/notifications" className={classes.appBarLink}>
            <NotificationsIcon />
          </RouterLink>
        </IconButton>

        <IconButton
          edge="end"
          color="secondary"
        >
          <RouterLink to="/connexion" className={classes.appBarLink}>
            <AccountIcon />
          </RouterLink>
        </IconButton>

      </Toolbar>
    </MaterialAppBar>
  );
};

export default AppBar;
