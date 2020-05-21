import React from 'react';

import { Route, Switch as RouterSwitch } from 'react-router';

import { UserProvider, useUserContext } from 'src/utils/UserContext';

import AppBar from './components/AppBar';
import Drawer, { drawerWidth } from './components/Drawer';
import Loader from './components/Loader';
import { NotificationsCountProvider } from './contexts/NotificationsCountContext';
import { createTheme } from './createTheme';
import Authentication from './pages/Authentication';
import Information from './pages/Information';
import Informations from './pages/InformationsList';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import UserReactions from './pages/UserReactions';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const Switch: React.FC = () => (
  <RouterSwitch>
    <Route path="/" exact component={Informations} />
    <Route path="/information/:id" component={Information} />
    <Route path="/reactions" component={UserReactions} />
    <Route path="/settings" component={Settings} />
    <Route path="/:sign(connexion|inscription)" component={Authentication} />
    <Route path="/notifications" component={Notifications} />
  </RouterSwitch>
);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    minHeight: '100vh',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

const theme = createTheme();

const Dashboard: React.FC = () => {
  const classes = useStyles({});
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useUserContext();

  const handleDrawerToggle = () => setMobileOpen(open => !open);

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <UserProvider value={{ user, setUser }}>
        <NotificationsCountProvider>
          <div className={classes.container}>

            <CssBaseline />

            <AppBar handleDrawerToggle={handleDrawerToggle} />

            <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <main className={classes.content}>

              <Toolbar />

              { user === undefined
                ? <Loader />
                : <Switch />
              }

            </main>

          </div>
        </NotificationsCountProvider>
      </UserProvider>

    </ThemeProvider>
  );
};

export default Dashboard;
