import React from 'react';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import Authenticated from '../../components/Authenticated';

import NotificationsList from './NotificationsList';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

const Notifications: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const currentTab = location.pathname;

  return (
    <Authenticated>

      <Typography variant="h4">Notifications</Typography>

      <Tabs
        value={currentTab}
        onChange={(_, value) => history.replace(value)}
      >
        <Tab value="/notifications" label="Non lues" />
        <Tab value="/notifications/lues" label="Lues" />
      </Tabs>

      <Switch>
        <Route exact path="/notifications" component={NotificationsList} />
        <Route path="/notifications/lues" render={() => <NotificationsList seen />} />
      </Switch>

    </Authenticated>
  );
};

export default Notifications;
