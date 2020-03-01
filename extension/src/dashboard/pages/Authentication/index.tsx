import React from 'react';

import { Route, Switch, useHistory, useParams } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import MaterialTabs from '@material-ui/core/Tabs';

type TabsProps = {
  currentTab: string;
};

const useTabStyles = makeStyles((theme: Theme) => ({
  tabContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const Tabs: React.FC<TabsProps> = ({ currentTab }) => {
  const history = useHistory();
  const classes = useTabStyles({});

  return (
    <MaterialTabs
      centered
      className={classes.tabContainer}
      value={currentTab}
      onChange={(_, value) => history.replace(`/${value}`)}
    >
      <Tab value="connexion" label="Connexion" />
      <Tab value="inscription" label="Inscription" />
    </MaterialTabs>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  spacerTop: {
    flex: 1,
  },
  paper: {
    margin: 'auto',
    padding: theme.spacing(4),
    width: '60%',
    maxWidth: 600,
    minWidth: 400,
  },
  spacerBottom: {
    flex: 2,
  },
}));

const Authentication: React.FC = () => {
  const { sign: currentTab } = useParams<{ sign: string }>();

  const classes = useStyles({});

  return (
    <>
      <div className={classes.spacerTop} />
      <Paper elevation={2} className={classes.paper}>
        <Tabs currentTab={currentTab} />
        <Switch>
          <Route path="/connexion" component={LoginForm} />
          <Route path="/inscription" component={SignupForm} />
        </Switch>
      </Paper>
      <div className={classes.spacerBottom} />
    </>
  );
};

export default Authentication;
