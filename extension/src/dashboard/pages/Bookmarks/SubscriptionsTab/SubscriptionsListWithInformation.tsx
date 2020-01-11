import React from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import { parseSubscription, Subscription } from 'src/types/Subscription';

const SubscriptionsListWithInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const axiosResponse = useAxiosPaginated<Subscription>(`/api/subscription/me?informationId=${id}`, parseSubscription);
  const reactions = axiosResponse[0].data;

  return (
    <ReactionsListWithInformation
      axiosResponse={axiosResponse}
      reactions={reactions && reactions.map(s => s.reaction)}
    />
  );
};

export default SubscriptionsListWithInformation;
