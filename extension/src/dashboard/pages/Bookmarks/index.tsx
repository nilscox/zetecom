import React from 'react';
import { useHistory, useLocation, Switch, Route } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import BookmarksTab from './BookmarkTab';
import SubscriptionsTab from './SubscriptionTab';
import Box from 'src/components/common/Box';

const Bookmarks = () => {
  const history = useHistory();
  const location = useLocation();

  const currentTab = location.pathname.includes('souscriptions') ? 'souscriptions' : '';

  return (
    <>
      <Typography variant="h4">Mes favoris</Typography>

      <Box my={12} style={{ borderBottom: '1px solid #CCC' }}>
        <Tabs
          value={currentTab || ''}
          onChange={(_, value) => history.push(`/favoris/${value}`)}
        >
          <Tab value="" label="Favoris" />
          <Tab value="souscriptions" label="Souscriptions" />
        </Tabs>
      </Box>

      <Switch>
        <Route path="/favoris/souscriptions" component={SubscriptionsTab} />
        <Route exact path="/favoris" component={BookmarksTab} />
      </Switch>
    </>
  );
};

export default Bookmarks;
