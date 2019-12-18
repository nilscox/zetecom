import React from 'react';
import { Switch, Route, useHistory, useParams } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import MaterialTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

type TabsProps = {
  currentTab: string;
};

const useTabStyle = makeStyles((theme: Theme) => ({
  tabContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const Tabs: React.FC<TabsProps> = ({ currentTab }) => {
  const history = useHistory();
  const classes = useTabStyle({});

  return (
    <MaterialTabs
      centered
      className={classes.tabContainer}
      value={currentTab}
      onChange={(_, value) => history.push(`/auth/${value}`)}
    >
      <Tab value="login" label="Connexion" />
      <Tab value="signup" label="Inscription" />
    </MaterialTabs>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  dividerTop: {
    flex: 1,
  },
  paper: {
    width: 600,
    margin: 'auto',
    padding: theme.spacing(4),
  },
  dividerBottom: {
    flex: 2,
  },
}));

const Authentication: React.FC = () => {
  const { sign: currentTab } = useParams();

  const classes = useStyles({});

  return (
    <>
      <div className={classes.dividerTop} />
      <Paper elevation={2} className={classes.paper}>
        <Tabs currentTab={currentTab} />

        <Switch>
          <Route path="/auth/login" component={LoginForm} />
          <Route path="/auth/signup" component={SignupForm} />
        </Switch>
      </Paper>
      <div className={classes.dividerBottom} />
    </>
  );
};

export default Authentication;
