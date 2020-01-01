import React, { useEffect, useState } from 'react';

import Loader from 'src/dashboard/components/Loader';

import ReactionItem from './ReactionItem';
import Authenticated from 'src/dashboard/components/Authenticated';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import PaginatedList from 'src/dashboard/components/PaginatedList';

import { parseSubscription } from 'src/types/Subscription';
import { parseReaction, Reaction } from 'src/types/Reaction';

const SubscriptionsTab: React.FC = () => {
  const [reactions, setReactions] = useState([]);
  const [
    { loading, data: subscriptions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/subscription/me', parseSubscription);

  useEffect(() => {
    if (!loading && subscriptions) {
      const subscribedReactions: Reaction[] = [];

      subscriptions.forEach(s => subscribedReactions.push(parseReaction(s.reaction)));

      setReactions(subscribedReactions);
    }
  }, [subscriptions, loading]);

  return (
    <Authenticated>

      <PaginatedList
        onSearch={setSearch}
        page={page}
        pageSize={10}
        totalPages={totalPages}
        onPageChange={setPage}
      >

        { loading
          ? <Loader />
          : reactions.map(r => <ReactionItem key={r.id} reaction={r} />)
        }

      </PaginatedList>

    </Authenticated>
  );
};

export default SubscriptionsTab;
