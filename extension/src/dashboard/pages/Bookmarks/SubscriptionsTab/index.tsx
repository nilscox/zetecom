import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SubscriptionsList from './SubscriptionsList';
import SubscriptionsListWithInformation from './SubscriptionsListWithInformation';

const SubscriptionsTab: React.FC = () => (
  <Switch>
    <Route path="/favoris/souscriptions/:id" component={SubscriptionsListWithInformation} />
    <Route path="/favoris/souscriptions" component={SubscriptionsList} />
  </Switch>
);

export default SubscriptionsTab;
