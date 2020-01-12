import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ReactionsListForInformation from 'src/dashboard/components/ReactionsListForInformation';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import useQueryString from 'src/hooks/use-query-string';
import { parseSubscription } from 'src/types/Subscription';

type SubscriptionsListForInformationProps = {
  informationId: string;
};

const SubscriptionsListForInformation: React.FC<SubscriptionsListForInformationProps> = ({ informationId }) => {
  const axiosResponse = useAxiosPaginated(`/api/subscription/me?informationId=${informationId}`, parseSubscription);
  const subscriptions = axiosResponse[0].data;

  return (
    <ReactionsListForInformation
      axiosResponse={axiosResponse}
      reactions={subscriptions && subscriptions.map(s => s.reaction)}
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
      getInformationLink={(information) => `/favoris/souscriptions?informationId=${information.id}`}
    />
  );
};

const SubscriptionsTab: React.FC<RouteComponentProps> = ({ location }) => {
  const { informationId } = useQueryString(location.search);

  if (informationId)
    return <SubscriptionsListForInformation informationId={informationId as string} />;

  return <SubscriptionsList />;
};

export default SubscriptionsTab;
