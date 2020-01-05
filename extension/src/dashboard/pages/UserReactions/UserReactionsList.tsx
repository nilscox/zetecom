import React from 'react';

import Loader from 'src/dashboard/components/Loader';
import { parseReaction } from 'src/types/Reaction';

import PaginatedList from '../../components/PaginatedList';
import ReactionWithInform from '../../components/ReactionWithInformation';

import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const UserReactionsList: React.FC = () => {
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/reaction/me', parseReaction);

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
        : reactions.map(r => <ReactionWithInform key={r.id} reaction={r} link={`/reactions/${r.information.id}`} />)
      }

    </PaginatedList>
  );
};

export default UserReactionsList;
