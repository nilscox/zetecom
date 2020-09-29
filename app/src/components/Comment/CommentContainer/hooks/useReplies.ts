import { useCallback, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import useUpdateEffect from 'src/hooks/use-update-effect';
import useEditableDataset from 'src/hooks/useEditableDataset';
import { Comment, parseComment } from 'src/types/Comment';
import { Paginated, usePaginatedResults } from 'src/utils/parse-paginated';

const useReplies = (parent: Comment) => {
  const [page, setPage] = useState(0);

  const url = `/api/comment/${parent.id}/replies`;
  // TODO
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const parse = useCallback(usePaginatedResults(parseComment), []);
  const [{ data, loading, error }, fetch] = useAxios<Paginated<Comment>>(
    url,
    parse,
    { manual: true },
  );

  if (error) {
    throw error;
  }

  const [replies, { prepend }] = useEditableDataset(data?.items, 'append');

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (page !== 1) {
      opts.params.page = page;
    }

    if (parent) {
      fetch(opts);
    }
  // TODO
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return [
    {
      replies,
      remainingRepliesCount: data && replies ? (data.total - replies.length) : undefined,
      loading,
    },
    {
      fetchMoreReplies: () => setPage(page + 1),
      addReply: prepend,
    },
  ] as const;
};

export default useReplies;
