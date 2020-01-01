import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider, Theme } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/amber';
import Toolbar from '@material-ui/core/Toolbar';
import { Switch as RouterSwitch, Route } from 'react-router';

import { useUserContext, UserProvider } from 'src/utils/UserContext';

import UserReactions from './pages/UserReactions';
import Bookmarks from './pages/Bookmarks';
import Settings from './pages/Settings';
import Informations from './pages/InformationsList';
import Information from './pages/Information';
import Authentication from './pages/Authentication';

import AppBar from './components/AppBar';
import Drawer, { drawerWidth } from './components/Drawer';
import Loader from './components/Loader';

const theme = createMuiTheme({
  palette: {
    primary,
    secondary: { main: '#446' },
  },
});

const Switch: React.FC = () => (
  <RouterSwitch>
    <Route path="/" exact component={Informations} />
    <Route path="/information/:id" component={Information} />
    <Route path="/reactions" component={UserReactions} />
    <Route path="/bookmarks" component={Bookmarks} />
    <Route path="/settings" component={Settings} />
    <Route path="/:sign(connexion|inscription)" component={Authentication} />
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

const Dashboard: React.FC = () => {
  const classes = useStyles({});
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useUserContext();

  const handleDrawerToggle = () => setMobileOpen(open => !open);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider value={{ user, setUser }}>
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
      </UserProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
