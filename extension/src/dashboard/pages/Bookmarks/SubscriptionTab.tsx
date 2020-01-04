import React from 'react';

import Loader from 'src/dashboard/components/Loader';

import ReactionItem from './ReactionItem';
import Authenticated from 'src/dashboard/components/Authenticated';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import PaginatedList from 'src/dashboard/components/PaginatedList';

import { parseSubscription } from 'src/types/Subscription';

const SubscriptionsTab: React.FC = () => {
  const [
    { loading, data: subscriptions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/subscription/me', parseSubscription);

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
          : subscriptions.map(s => <ReactionItem key={s.id} reaction={s.reaction} />)
        }

      </PaginatedList>

    </Authenticated>
  );
};

export default SubscriptionsTab;
