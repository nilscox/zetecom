import { useCallback, useMemo, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import useAxiosHook from 'axios-hooks';

export type AxiosMeta = {
  loading: boolean;
  error: null | Error;
  response?: AxiosResponse;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

export type AxiosHookResult<T, E = any> =
  | Readonly<[T, AxiosMeta]>
  | Readonly<[T, AxiosMeta, E]>;
export type AxiosHook<T, E = any> = (...args: any[]) => AxiosHookResult<T, E>;

export type AxiosHookAsyncResult<T, E = any> =
  | Readonly<[(...args: any[]) => T | Promise<T>, AxiosMeta]>
  | Readonly<[(...args: any[]) => T | Promise<T>, AxiosMeta, E]>;
export type AxiosHookAsync<T, E = any> = (...args: any[]) => AxiosHookAsyncResult<T, E>;

export type ResponseData = any;

/* eslint-enable @typescript-eslint/no-explicit-any */

export default function useAxios<T>(config: AxiosRequestConfig, parse: (data: ResponseData) => T): AxiosHookResult<T> {
  const [{ data, loading, error, response }] = useAxiosHook(config);
  const parsed = useMemo(() => data && parse(data), [data]);

  return [
    parsed || undefined,
    {
      loading: loading || data && !parsed,
      error,
      response,
    },
  ] as const;
}

export const useAxiosMeta = () => {
  const [loading, setLoading] = useState<AxiosMeta['loading']>(false);
  const [error, setError] = useState<AxiosMeta['error']>(null);

  const setMeta = useCallback(({ loading, error }: Partial<AxiosMeta>) => {
    if (loading !== undefined)
      setLoading(loading);
    if (error !== undefined)
      setError(error);
  }, [setLoading, setError]);

  return [
    { loading, error },
    setMeta,
  ] as const;
};
