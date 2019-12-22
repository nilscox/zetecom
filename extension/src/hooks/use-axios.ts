import { useMemo, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import useAxiosHook, { Options as AxiosHooksOptions } from 'axios-hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseData = any;

export default function useAxios<T>(
  config: AxiosRequestConfig | string,
  parse?: (data: ResponseData) => T,
  options?: AxiosHooksOptions,
) {
  const [{ data, loading, error, response }, refetch] = useAxiosHook(config, options);

  const parsed = useMemo(() => {
    if (!parse)
      return undefined;

    if (response) {
      if (data && !error && [200, 201].includes(response.status))
        return parse(data);
      else
        return undefined;
    }

    return null;
  }, [response, data, error, parse]);

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
      loading: loading || (data && parsed === null),
      error,
      response,
      status,
    },
    refetch,
  ] as const;
}
