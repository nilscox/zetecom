import { useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useUpdateEffect from 'src/hooks/useUpdateEffect';
import { SortType } from 'src/types/SortType';

import useAxios, { UseAxiosParams, UseAxiosReturnType } from './useAxios';

type Paginated<T> = {
  items: T[];
  total: number;
};

type UseAxiosPaginatedReturnType<TResponse, TError> = [
  UseAxiosReturnType<Paginated<TResponse>, TError>[0],
  UseAxiosReturnType<Paginated<TResponse>, TError>[1] & {
    page?: number;
    setPage: (page?: number) => void;
    sort?: SortType;
    setSort: (sort?: SortType) => void;
    search?: string;
    setSearch: (search?: string) => void;
  },
  UseAxiosReturnType<Paginated<TResponse>, TError>[2],
];

const useAxiosPaginated = <TResponse, TError = any>(
  ...args: UseAxiosParams
): UseAxiosPaginatedReturnType<TResponse, TError> => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortType>();
  const [search, setSearch] = useState('');

  const [data, result, refetch] = useAxios<Paginated<TResponse>>(...args);

  useUpdateEffect(() => {
    const params: AxiosRequestConfig['params'] = {};

    if (page !== 1) {
      params.page = page;
    }

    if (sort !== undefined) {
      params.sort = sort;
    }

    if (search !== '') {
      params.search = search;
    }

    refetch({ params });
  }, [page, sort, search, refetch]);

  return [data, { ...result, page, setPage, sort, setSort, search, setSearch }, refetch];
};

export default useAxiosPaginated;
