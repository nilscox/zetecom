import React, { useEffect, useState } from 'react';

import FormInput, { FormInputProps } from './FormInput';

export type GlobalErrorHandler = (error: Error) => string | null;
export type FieldErrorsHandler = (error: Error) => ({ [key: string]: string });

export const useFormErrors = (
  error: Error,
  getGlobalError: GlobalErrorHandler,
  getFieldErrors: FieldErrorsHandler,
) => {
  const [global, setGlobal] = useState(getGlobalError(error));
  const [fields, setFields] = useState(getFieldErrors(error));
  const [handled, setHandled] = useState(!!error && (!!global || !!fields));

  useEffect(() => {
    const g = getGlobalError(error);
    const f = getFieldErrors(error);

    setGlobal(g);
    setFields(f);
    setHandled(!!error && (!!g || !!f));
  }, [error]);

  const reset = () => {
    setGlobal(null);
    setFields(null);
  };

  return [
    global,
    fields,
    reset,
    handled,
  ] as const;
};

type FormField = Omit<FormInputProps, 'onTextChange'>;

type FormProps = {
  fields?: { [name: string]: FormField | JSX.Element };
  errors?: ({ [key: string]: string });
  children?: React.ReactNode;
  isValid?: (values: { [fields: string]: string }) => boolean;
  onChange?: (key: string, value: string) => void;
  onSubmit?: (values: { [fields: string]: string }) => void;
};

type FieldProps = FormField & {
  fieldKey: string;
};

const Form: React.FC<FormProps> = ({
  fields = {},
  children = null,
  isValid = () => true,
  onChange = () => {},
  onSubmit = () => {},
}) => {
  const [values, setValues] = useState<{ [name: string]: string }>(
    Object.keys(fields).reduce((o: { [name: string]: string }, k: string) => {
      o[k] = '';
      return o;
    }, {})
  );

  const valid = isValid(values);

  const handleTextChange = (key: string, text: string) => {
    const updatedValues = { ...values };
    updatedValues[key] = text;

    setValues(updatedValues);

    if (onChange)
      onChange(key, text);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (valid)
      onSubmit(values);
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
      onSubmit={handleSubmit}
    >
      {Object.keys(fields).map((key: string) =>
        React.isValidElement(fields[key]) ? (
          <div key={key}>{fields[key]}</div>
        ) : (
          <FormInput
            key={key}
            {...fields[key] as FormField}
            onTextChange={(text) => handleTextChange(key, text)}
          />
        )
      )}
      { children }
    </form>
  );
};

export default Form;
