import React from 'react';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import Box from 'src/components/common/Box';
import Authenticated from 'src/dashboard/components/Authenticated';

import BookmarksTab from './BookmarksTab';
import SubscriptionsTab from './SubscriptionsTab';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

const Bookmarks = () => {
  const history = useHistory();
  const location = useLocation();

  const currentTab = location.pathname;

  return (
    <Authenticated>
      <Typography variant="h4">Mes favoris</Typography>

      <Box my={12} style={{ borderBottom: '1px solid #CCC' }}>
        <Tabs
          value={currentTab || ''}
          onChange={(_, value) => history.replace(value)}
        >
          <Tab value="/favoris" label="Favoris" />
          <Tab value="/favoris/souscriptions" label="Souscriptions" />
        </Tabs>
      </Box>

      <Switch>
        <Route path="/favoris/souscriptions" component={SubscriptionsTab} />
        <Route path="/favoris" component={BookmarksTab} />
      </Switch>
    </Authenticated>
  );
};

export default Bookmarks;
