import React from 'react';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BookmarksTab from './BookmarksTab';
import SubscriptionsTab from './SubscriptionsTab';
import Box from 'src/components/common/Box';

const Bookmarks = () => {
  const history = useHistory();
  const location = useLocation();

  const currentTab = location.pathname.includes('souscriptions') ? 'subscriptions' : 'bookmarks';

  return (
    <>
      <Typography variant="h4">Mes favoris</Typography>

      <Box my={12} style={{ borderBottom: '1px solid #CCC' }}>
        <Tabs
          value={currentTab || ''}
          onChange={(_, value) => {
            const path = value === 'subscriptions' ? 'souscriptions' : '';
            history.replace(`/favoris/${path}`);
          }}
        >
          <Tab value="bookmarks" label="Favoris" />
          <Tab value="subscriptions" label="Souscriptions" />
        </Tabs>
      </Box>

      <Switch>
        <Route path="/favoris/souscriptions" component={SubscriptionsTab} />
        <Route path="/favoris" component={BookmarksTab} />
      </Switch>
    </>
  );
};

export default Bookmarks;
