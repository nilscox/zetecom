import { useMemo, useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import { ClassConstructor, Type } from 'class-transformer';

import useAxios, { AxiosHooksOptions } from 'src/hooks/use-axios';
import useUpdateEffect from 'src/hooks/use-update-effect';
import { SortType } from 'src/types/SortType';

type Paginated<T> = {
  items: T[];
  total: number;
};

const usePaginatedClass = <T>(cls?: ClassConstructor<T>) => {
  return useMemo(() => {
    if (!cls) {
      return;
    }

    class PaginatedClass {
      @Type(() => cls)
      items: T[];

      total: number;
    }

    return PaginatedClass;
  }, [cls]);
};

export default function useAxiosPaginated<T>(url: string, options?: AxiosHooksOptions, cls?: ClassConstructor<T>) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>();
  const [page, setPage] = useState(1);

  const [result, refetch] = useAxios<Paginated<T>>(url, options, usePaginatedClass(cls));

  useUpdateEffect(() => {
    const opts: AxiosRequestConfig = { params: {} };

    if (search) {
      opts.params.search = search;
    }

    if (sort) {
      opts.params.sort = sort;
    }

    if (page !== 1) {
      opts.params.page = page;
    }

    refetch(opts);
    // TODO
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, page]);

  return [
    {
      ...result,
      data: useMemo(() => result.data?.items, [result.data]),
      total: useMemo(() => result.data?.total, [result.data]),
    },
    { search, setSearch },
    { sort, setSort },
    { page, setPage },
    refetch,
  ] as const;
}
