import React from 'react';

import MaterialDrawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import InformationIcon from '@material-ui/icons/Subject';
import CommentIcon from '@material-ui/icons/InsertComment';
import BookmarkIcon from '@material-ui/icons/Star';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import Flex from 'src/components/common/Flex';
import { useCurrentUser } from 'src/hooks/use-user';

export const drawerWidth = 340;

const useListItemLinkStyles = makeStyles<Theme, { isActive: boolean }>(theme => ({
  text: ({ isActive }) => ({
    ...(isActive && { color: theme.palette.primary.dark }),
  }),
}));

type ListItemLink = {
  auth?: boolean;
  icon: React.ReactElement;
  primary: React.ReactNode;
  to: string;
};

const ListItemLink: React.FC<ListItemLink> = ({ auth, icon, primary, to }) => {
  const user = useCurrentUser();

  const { pathname } = useLocation();
  const isActive = !!useRouteMatch({ path: to === '/' ? '/information' : to }) || to === '/' && pathname === '/';
  const classes = useListItemLinkStyles({ isActive });

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef<HTMLAnchorElement>((linkProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <Link to={to} {...linkProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ListItem disabled={auth && !user} button component={renderLink as any}>
        <ListItemIcon>{ icon }</ListItemIcon>
        <ListItemText color="primary" primary={primary} className={classes.text} />
      </ListItem>
    </li>
  );
};

const useDrawerStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  logo: {
    width: '100%',
    maxWidth: 80,
    opacity: 0.8,
  },
}));

type DrawerProps = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

const Drawer: React.FC<DrawerProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const classes = useDrawerStyles({});

  const drawer = (
    <div>

      <Flex flexDirection="column" alignItems="center">
        <img src="https://reagir-information-extension.nils.cx/assets/images/logo.png" className={classes.logo} />
      </Flex>

      <Divider />

      <List>
        <ListItemLink icon={<InformationIcon />} primary="Informations" to="/" />
        <ListItemLink auth icon={<CommentIcon />} primary="Mes réactions" to="/reactions" />
        <ListItemLink auth icon={<BookmarkIcon />} primary="Mes favoris" to="/favoris" />
      </List>

      <Divider />

      <List>
        <ListItemLink auth icon={<SettingsIcon />} primary="Paramètres" to="/settings" />
      </List>

    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <MaterialDrawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            // Better open performance on mobile.
            keepMounted: true,
          }}
        >
          {drawer}
        </MaterialDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <MaterialDrawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </MaterialDrawer>
      </Hidden>
    </nav>
  );
};

export default Drawer;
