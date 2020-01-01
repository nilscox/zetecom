import React from 'react';

import { Typography } from '@material-ui/core';

import Loader from 'src/dashboard/components/Loader';
import { parseReaction } from 'src/types/Reaction';

import UserReactionItem from './UserReactionItem';
import Authenticated from 'src/dashboard/components/Authenticated';
import PaginatedList from 'src/dashboard/components/PaginatedList';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';

const UserReactions: React.FC = () => {
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/reaction/me', parseReaction);

  return (
    <Authenticated>

      <Typography variant="h4">Mes réactions</Typography>

      <PaginatedList
        onSearch={setSearch}
        page={page}
        pageSize={10}
        totalPages={totalPages}
        onPageChange={setPage}
      >

        { loading
          ? <Loader />
          : reactions.map(r => <UserReactionItem key={r.id} reaction={r} />)
        }

      </PaginatedList>

    </Authenticated>
  );
};

export default UserReactions;
