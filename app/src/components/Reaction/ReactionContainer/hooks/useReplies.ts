import { useCallback, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import useEditableDataset from 'src/hooks/use-editable-dataset';
import useUpdateEffect from 'src/hooks/use-update-effect';
import { parseReaction, Reaction } from 'src/types/Reaction';
import { Paginated, usePaginatedResults } from 'src/utils/parse-paginated';

const useReplies = (parent: Reaction) => {
  const [page, setPage] = useState(0);

  const url = `/api/reaction/${parent.id}/replies`;
  // TODO
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parse = useCallback(usePaginatedResults(parseReaction), []);
  const [{ data, loading, error }, fetch] = useAxios<Paginated<Reaction>>(
    url,
    parse,
    { manual: true },
  );

  const [replies, { prepend }] = useEditableDataset(data ? data.items : null, { appendOnUpdate: true });

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (page !== 1)
      opts.params.page = page;

    if (parent)
      fetch(opts);
  // TODO
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return [
    {
      replies,
      remainingRepliesCount: data?.total - replies?.length,
      loading,
      error,
    },
    {
      fetchMoreReplies: () => setPage(page + 1),
      addReply: prepend,
    },
  ] as const;
};

export default useReplies;
