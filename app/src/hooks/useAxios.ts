import { useCallback, useMemo } from 'react';

import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import useAxiosHooks, { RefetchOptions, ResponseValues } from 'axios-hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const catchAxiosCancel = (err: unknown) => {
  if (!axios.isCancel(err)) {
    throw err;
  }
};

export type Status = (expected: number | number[]) => boolean;
export type Refetch<TResponse> = (config?: AxiosRequestConfig, options?: RefetchOptions) => AxiosPromise<TResponse>;

export type UseAxiosParams = Parameters<typeof useAxiosHooks>;

export type UseAxiosReturnType<TResponse, TError> = [
  TResponse | undefined,
  ResponseValues<TResponse, TError> & { status: Status },
  Refetch<TResponse>,
];

const useAxios = <TResponse, TError = unknown>(...args: UseAxiosParams): UseAxiosReturnType<TResponse, TError> => {
  const [result, refetch] = useAxiosHooks<TResponse>(...args);
  const response = useMemo(() => result.response || result.error?.response, [result]);

  const status = useCallback(
    (expected: number | number[]): boolean => {
      if (!response) {
        return false;
      }

      if (Array.isArray(expected)) {
        return expected.includes(response.status);
      }

      return response.status === expected;
    },
    [response],
  );

  const refetchHandlingCancel = useCallback<Refetch<TResponse>>(
    (...args) => {
      return refetch(...args).catch(() => {}) as AxiosPromise<TResponse>;
    },
    [refetch],
  );

  return [result.data, useMemo(() => ({ ...result, status }), [result, status]), refetchHandlingCancel];
};

export default useAxios;
