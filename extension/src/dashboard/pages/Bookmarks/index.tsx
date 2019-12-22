import React, { useState } from 'react';

import { Typography } from '@material-ui/core';
import { AxiosRequestConfig } from 'axios';

import useUpdateEffect from 'src/hooks/use-update-effect';
import { Paginated, usePaginatedResults } from 'src/utils/parse-paginated';
import useAxios from 'src/hooks/use-axios';
import Loader from 'src/dashboard/components/Loader';
import { Reaction, parseReaction } from 'src/types/Reaction';

import MyBookmarkedItem from './MyBookmarkedItem';
import Authenticated from 'src/dashboard/components/Authenticated';

const useUserBookmarks = (page: number) => {
  const [result, refetch] = useAxios<Paginated<Reaction>>('/api/bookmark/me', usePaginatedResults(parseReaction));

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [page]);

  return result;
};

const Bookmarks: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const { loading, data: reactions } = useUserBookmarks(page);

  return (
    <Authenticated>
      <Typography variant="h4">Mes favoris</Typography>
      { loading
        ? <Loader />
        : reactions.items.map(r => <MyBookmarkedItem key={r.id} reaction={r} />)
      }
    </Authenticated>
  );
};

export default Bookmarks;
