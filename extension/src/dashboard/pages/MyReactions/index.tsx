import React, { useState } from 'react';

import { Typography } from '@material-ui/core';
import { AxiosRequestConfig } from 'axios';

import useUpdateEffect from 'src/hooks/use-update-effect';
import { Paginated, usePaginatedResults } from 'src/utils/parse-paginated';
import useAxios from 'src/hooks/use-axios';
import Loader from 'src/dashboard/components/Loader';
import { Reaction, parseReaction } from 'src/types/Reaction';

import MyReactionItem from './MyReactionItem';
import Authenticated from 'src/dashboard/components/Authenticated';

const useUserReactions = (page: number) => {
  const [result, refetch] = useAxios<Paginated<Reaction>>('/api/reaction/me', usePaginatedResults(parseReaction));

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [page]);

  return result;
};

const Reactions: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const { loading, data: reactions } = useUserReactions(page);

  return (
    <Authenticated>
      <Typography variant="h4">Mes réactions</Typography>
      { loading
        ? <Loader />
        : reactions.items.map(r => <MyReactionItem key={r.id} reaction={r} />)
      }
    </Authenticated>
  );
};

export default Reactions;
