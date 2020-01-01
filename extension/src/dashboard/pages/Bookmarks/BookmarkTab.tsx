import React from 'react';

import Loader from 'src/dashboard/components/Loader';
import { parseReaction } from 'src/types/Reaction';

import ReactionItem from './ReactionItem';
import Authenticated from 'src/dashboard/components/Authenticated';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import PaginatedList from 'src/dashboard/components/PaginatedList';

const BookmarksTab: React.FC = () => {
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/bookmark/me', parseReaction);

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

export default BookmarksTab;
