import { ReactNode } from 'react';

import { AxiosError } from 'axios';

type ErrorHandler = (error: AxiosError) => ReactNode;

export const createFormErrorsHandler = <F extends string>(
  getFieldError?: { [key in F]: ErrorHandler },
  getGlobalError?: ErrorHandler,
) => {
  const useFormErrorHandler = (error?: AxiosError) => {
    if (!error) {
      return;
    }

    const fieldErrors = getFieldError && Object.keys(getFieldError)
      .map((field: F) => [field, getFieldError[field](error)])
      .filter(([, error]) => error !== undefined)
      .reduce((obj, [field, error]: [F, ReactNode]) => ({
        ...obj,
        [field]: error,
      }), {} as { [field in F]: ReactNode });

    const globalError = getGlobalError?.(error);

    const result: {
      fieldErrors?: { [field in F]: ReactNode };
      globalError?: ReactNode;
      unhandledError?: AxiosError;
    } = {};

    if (Object.keys(fieldErrors || {}).length > 0) {
      result.fieldErrors = fieldErrors;
    }

    if (globalError) {
      result.globalError = globalError;
    }

    if (error && Object.keys(result).length === 0) {
      result.unhandledError = error;
    }

    if (Object.keys(result).length > 0) {
      return result;
    }
  };

  return useFormErrorHandler;
};
