import { ReactNode, useEffect, useState } from 'react';

export type ErrorHandler<E> = (error: E) => ReactNode | undefined;

export type FieldErrorsHandler<E, T> = { [field in keyof T]?: ErrorHandler<E> };
export type FormErrorsHandler<E> = ErrorHandler<E>;

export type FormErrorsHandlers<E, T> = FieldErrorsHandler<E, T> | [FieldErrorsHandler<E, T>, FormErrorsHandler<E>];

const useFormErrors = <E, T>(
  handlers: FormErrorsHandlers<E, T>,
  error?: E,
) => {
  const [fieldErrors, setFieldErrors] = useState<{ [F in keyof T]?: ReactNode }>({});
  const [formError, setFormError] = useState<ReactNode>();

  useEffect(() => {
    if (!error)
      return;

    const [fieldsHandler, formHandler] = Array.isArray(handlers) ? handlers : [handlers];
    const fields = Object.keys(fieldsHandler);
    const fieldErrors: { [F in keyof T]?: ReactNode } = {};

    fields.forEach((field) => {
      const fieldError = fieldsHandler[field as keyof T](error);

      if (typeof fieldError !== 'undefined')
        fieldErrors[field as keyof T] = fieldError;
    });

    setFieldErrors(fieldErrors);

    if (formHandler) {
      const formError = formHandler(error);

      if (typeof formError !== 'undefined')
        setFormError(formError);
    }
  }, [handlers, error]);

  return [
    [fieldErrors, (field: keyof T) => setFieldErrors({ ...fieldErrors, [field]: undefined })],
    [formError, () => setFormError(undefined)],
  ] as const;
};

export default useFormErrors;
