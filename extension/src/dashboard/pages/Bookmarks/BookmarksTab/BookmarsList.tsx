import React from 'react';

import Loader from 'src/dashboard/components/Loader';
import { parseReaction } from 'src/types/Reaction';

import PaginatedList from '../../../components/PaginatedList';
import ReactionWithInformation from 'src/dashboard/components/ReactionWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const BookmarksList: React.FC = () => {
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/bookmark/me', parseReaction);

  return (
    <PaginatedList
      onSearch={setSearch}
      page={page}
      pageSize={10}
      totalPages={totalPages}
      onPageChange={setPage}
    >

      { loading
        ? <Loader />
        : reactions.map(r => <ReactionWithInformation key={r.id} reaction={r} link={`/favoris/${r.information.id}`} />)
      }

    </PaginatedList>
  );
};

export default BookmarksList;
