import React from 'react';
import { useParams } from 'react-router-dom';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import ReactionsByInformationList from 'src/dashboard/components/ReactionsByInformationList';

import { parseSubscription } from 'src/types/Subscription';

const SubscriptionsByInformationList: React.FC = () => {
  const { id } = useParams();
  const [
    { loading, data: subscriptions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated(`/api/subscription/me?informationId=${id}`, parseSubscription);

  return (
    <>
      { subscriptions
        ? (
          <ReactionsByInformationList
            reactions={subscriptions.map(s => s.reaction)}
            loading={loading}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            setSearch={setSearch}
          />
        ) : null
      }
    </>
  );
};

export default SubscriptionsByInformationList;
