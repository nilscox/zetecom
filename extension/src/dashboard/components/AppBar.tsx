import React from 'react';

import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationIcon from '@material-ui/icons/Notifications';
import AccountIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { drawerWidth } from './Drawer';

const useStyles = makeStyles(theme => ({
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
          <Link to="/" className={classes.titleLink}>
            Réagir à l'information
          </Link>
        </Typography>

        <IconButton
          onClick={() => {}}
          color="secondary"
        >
          <HelpIcon />
        </IconButton>

        <IconButton
          onClick={() => {}}
          color="secondary"
        >
          <NotificationIcon />
        </IconButton>

        <IconButton
          edge="end"
          onClick={() => {}}
          color="secondary"
        >
          <AccountIcon />
        </IconButton>

      </Toolbar>
    </MaterialAppBar>
  )
};

export default AppBar;
