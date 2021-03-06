import { AxiosError } from 'axios';

export type FieldsErrors = Record<string, string>;
export type FormError = string;
export type FormErrors = [FormError | null, Partial<FieldsErrors>];

type HandlerLeaf = string | [string, string];

type FormErrorHandler =
  | HandlerLeaf
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((value: any, data: any) => HandlerLeaf | undefined)
  | { [key: string]: FormErrorHandler };

export type FormErrorHandlers = Record<number, FormErrorHandler>;

const isLeaf = (handler: FormErrorHandler): handler is HandlerLeaf => {
  return typeof handler === 'string' || Array.isArray(handler);
};

const getError = (handler: HandlerLeaf | undefined): FormErrors => {
  if (typeof handler === 'string') {
    return [handler, {}];
  }

  if (Array.isArray(handler)) {
    return [null, { [handler[0]]: handler[1] } as FieldsErrors];
  }

  return [null, {}];
};

const getErrors = (data: unknown, error: unknown, handler: FormErrorHandler | undefined): FormErrors => {
  if (!handler || isLeaf(handler)) {
    return getError(handler);
  }

  if (typeof handler === 'function') {
    return getError(handler(error, data));
  }

  if (typeof error !== 'object' || error === null) {
    return [null, {}];
  }

  return Object.entries(error).reduce(
    ([formError, fieldErrors], [key, value]) => {
      const result = getErrors(data, value, handler[key]);

      // prettier-ignore
      return [
        result[0] ?? formError,
        { ...result[1], ...fieldErrors },
      ];
    },
    [null, {}] as FormErrors,
  );
};

const getUnhandledError = (error: AxiosError, [formError, fieldErrors]: FormErrors) => {
  if (!formError && !Object.keys(fieldErrors).length) {
    return error;
  }

  return null;
};

const getFormErrors = (
  error: AxiosError | undefined,
  handlers: FormErrorHandlers,
): [...FormErrors, AxiosError | null] => {
  const { data, status } = error?.response ?? {};

  if (!error || !status) {
    return [null, {}, null];
  }

  const errors = getErrors(data, data, handlers[status]);

  return [...errors, getUnhandledError(error, errors)];
};

export default getFormErrors;
