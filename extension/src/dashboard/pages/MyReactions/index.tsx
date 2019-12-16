import React, { useState } from 'react';

import { Typography } from '@material-ui/core';

import useUpdateEffect from 'src/hooks/use-update-effect';
import { Paginated, paginatedResults } from 'src/utils/parse-paginated';
import useAxios from 'src/hooks/use-axios';
import Loader from 'src/dashboard/components/Loader';
import { Reaction, parseReaction } from 'src/types/Reaction';

import MyReactionItem from './MyReactionItem';
import Authenticated from 'src/dashboard/components/Authenticated';

const useUserReactions = (page: number) => {
  const [result, refetch] = useAxios<Paginated<Reaction>>('/api/reaction/me', paginatedResults(parseReaction));

  useUpdateEffect(() => {
    const opts: any = { params: {} };

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [page]);

  return result;
};

const Reactions: React.FC = () => {
  const [page, setPage] = useState(1);
  const { loading, data: reactions } = useUserReactions(page);

  return (
    <>
      <Typography variant="h4">Mes réactions</Typography>
      { loading
        ? <Loader />
        : reactions.items.map(r => <MyReactionItem key={r.id} reaction={r} />)
      }
    </>
  );
};

export default () => (
  <Authenticated>
    <Reactions />
  </Authenticated>
);
