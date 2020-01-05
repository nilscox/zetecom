import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Authenticated from 'src/dashboard/components/Authenticated';
import SubscriptionsList from './SubscriptionsList';
import SubscriptionsByInformationList from './SubscriptionsByInformationList';

const SubscriptionsTab: React.FC = () => (
  <Authenticated>

    <Switch>
      <Route path="/favoris/souscriptions/:id" component={SubscriptionsByInformationList} />
      <Route path="/favoris/souscriptions" component={SubscriptionsList} />
    </Switch>

  </Authenticated>
);

export default SubscriptionsTab;
