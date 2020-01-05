import React from 'react';

import Loader from 'src/dashboard/components/Loader';

import Authenticated from 'src/dashboard/components/Authenticated';
import ReactionWithInformation from 'src/dashboard/components/ReactionWithInformation';
import PaginatedList from 'src/dashboard/components/PaginatedList';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { parseSubscription } from 'src/types/Subscription';

const SubscriptionsList: React.FC = () => {
  const [
    { loading, data: souscriptions, totalPages },
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
          : souscriptions.map(s => (
            <ReactionWithInformation
              key={s.id}
              reaction={s.reaction}
              link={`/favoris/souscriptions/${s.reaction.information.id}`}
            />
          ))
        }

      </PaginatedList>

    </Authenticated>
  );
};

export default SubscriptionsList;
