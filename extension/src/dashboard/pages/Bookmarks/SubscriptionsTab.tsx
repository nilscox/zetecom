import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';

import ReactionsListForInformation from 'src/dashboard/components/ReactionsListForInformation';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseSubscription } from 'src/types/Subscription';

const SubscriptionsListForInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const axiosResponse = useAxiosPaginated(`/api/subscription/me?informationId=${id}`, parseSubscription);
  const reactions = axiosResponse[0].data;

  return (
    <ReactionsListForInformation
      axiosResponse={axiosResponse}
      reactions={reactions && reactions.map(s => s.reaction)}
    />
  );
};

const SubscriptionsList: React.FC = () => {
  const axiosResponse = useAxiosPaginated('/api/subscription/me', parseSubscription);
  const reactions = axiosResponse[0].data;

  return (
    <ReactionsListWithInformation
      axiosResponse={axiosResponse}
      reactions={reactions && reactions.map(s => s.reaction)}
      getInformationLink={(information) => `/favoris/souscriptions/${information.id}`}
    />
  );
};

const SubscriptionsTab: React.FC = () => (
  <Switch>
    <Route path="/favoris/souscriptions/:id" component={SubscriptionsListForInformation} />
    <Route path="/favoris/souscriptions" component={SubscriptionsList} />
  </Switch>
);

export default SubscriptionsTab;
