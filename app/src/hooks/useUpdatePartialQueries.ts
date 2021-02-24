import { QueryKey, useQueryClient } from 'react-query';
import { DataUpdateFunction, Updater } from 'react-query/types/core/utils';

const useUpdatePartialQueries = () => {
  const queryClient = useQueryClient();

  return <TData>(queryKey: QueryKey, updater: Updater<TData, TData>) => {
    const queryCache = queryClient.getQueryCache();
    const queries = queryCache.findAll(queryKey, { exact: false });

    for (const query of queries) {
      const data = queryClient.getQueryData<TData>(query.queryKey, { exact: false });

      if (data === undefined) {
        continue;
      }

      const updated = typeof updater === 'function' ? (updater as DataUpdateFunction<TData, TData>)(data) : updater;

      queryClient.setQueryData(query.queryKey, updated);
    }
  };
};

export default useUpdatePartialQueries;
