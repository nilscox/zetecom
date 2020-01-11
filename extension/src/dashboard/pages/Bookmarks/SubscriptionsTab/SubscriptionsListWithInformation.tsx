import React from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import ReactionsListWithInformation from 'src/dashboard/components/ReactionsListWithInformation';

import { parseSubscription } from 'src/types/Subscription';

const SubscriptionsListWithInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [
    { loading, data: subscriptions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated(`/api/subscription/me?informationId=${id}`, parseSubscription);

  return (
    <>
      { subscriptions && (
        <ReactionsListWithInformation
          reactions={subscriptions.map(s => s.reaction)}
          loading={loading}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          setSearch={setSearch}
        />
      ) }
    </>
  );
};

export default SubscriptionsListWithInformation;
