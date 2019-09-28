import { useMemo, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import useAxiosHook, { Options as AxiosHooksOptions } from 'axios-hooks';

export default function useAxios<T>(
  config: AxiosRequestConfig | string,
  parse: (data: any) => T,
  options?: AxiosHooksOptions,
) {
  const [{ data, loading, error, response }, refetch] = useAxiosHook(config, options);

  const parsed = useMemo(() => {
    if (data && !error)
      return parse(data);

    return undefined;
  }, [data, error, parse]);

  const status = useCallback((s: number | number[]): boolean => {
    if (!response)
      return false;

    if (Array.isArray(s))
      return s.includes(response.status);

    return response.status === s;
  }, [response]);

  return [
    {
      data: parsed,
      raw: data,
      loading: loading || (data && !parsed),
      error,
      response,
      status,
    },
    refetch,
  ] as const;
}
