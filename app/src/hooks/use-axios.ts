import { useCallback, useMemo } from 'react';

import { AxiosRequestConfig } from 'axios';
import useAxiosHook from 'axios-hooks';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export type AxiosHooksOptions = {
  manual?: boolean;
  useCache?: boolean;
};

export default function useAxios<T>(
  config: AxiosRequestConfig | string,
  options: AxiosHooksOptions = {},
  cls?: ClassType<T>,
) {
  if (typeof options.useCache === 'undefined') {
    options.useCache = false;
  }

  const [result, refetch] = useAxiosHook(config, options);
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

  const data = useMemo(() => {
    if (status([200, 201]) && response?.data && cls) {
      return plainToClass(cls, response.data);
    }
  }, [status, response, cls]);

  return [
    {
      ...result,
      data,
      raw: response?.data,
      status,
    },
    refetch,
  ] as const;
}
