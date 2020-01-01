import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';

import useAxios, { ResponseData } from 'src/hooks/use-axios';
import useUpdateEffect from 'src/hooks/use-update-effect';
import { Paginated, usePaginatedResults } from 'src/utils/parse-paginated';
import { SortType } from 'src/types/SortType';

export default function useAxiosPaginated<T>(url: string, parseItem: (data: ResponseData) => T) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>();
  const [page, setPage] = useState(1);

  const [result, refetch] = useAxios<Paginated<T>>(url, usePaginatedResults(parseItem));

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (search)
      opts.params.search = search;

    if (sort)
      opts.params.sort = sort;

    if (page !== 1)
      opts.params.page = page;

    refetch(opts);
  }, [search, sort, page]);

  return [
    {
      ...result,
      data: result.data ? result.data.items : undefined,
      totalPages: result.data ? result.data.total : undefined,
    },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
  ] as const;
}
