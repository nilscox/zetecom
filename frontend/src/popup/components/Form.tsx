import React, { useEffect, useState, useCallback } from 'react';

import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';

import FormInput, { FormInputProps } from './FormInput';
import FormError from './FormError';

export type GlobalErrorHandler = (error: Error) => string | null;
export type FieldErrorsHandler = (error: Error) => ({ [key: string]: string });

export const useFormErrors = (
  error: Error | undefined,
  getGlobalError: GlobalErrorHandler,
  getFieldErrors: FieldErrorsHandler,
) => {
  const [unhandledError, setUnhandledError] = useState();
  const [global, setGlobal] = useState();
  const [fields, setFields] = useState();

  if (unhandledError)
    throw unhandledError;

  useEffect(() => {
    if (!error)
      return;

    const g = getGlobalError(error);
    const f = getFieldErrors(error);

    setGlobal(g);
    setFields(f);

    if (!!error && !g && !f)
      setUnhandledError(error);
  }, [error, getGlobalError, getFieldErrors]);

  const reset = () => {
    setGlobal(undefined);
    setFields(undefined);
  };

  return [
    global,
    fields,
    reset,
  ] as const;
};

type FormField = Omit<FormInputProps, 'onTextChange'>;

type FormProps = {
  fields?: { [name: string]: FormField | JSX.Element };
  loading?: boolean;
  submitButtonValue?: string;
  globalError?: string;
  isValid?: (values: { [fields: string]: string }) => boolean;
  onChange?: (key: string, value: string) => void;
  onSubmit?: (values: { [fields: string]: string }) => void;
};

type FieldProps = FormField & {
  fieldKey: string;
};

const Form: React.FC<FormProps> = ({
  fields = {},
  loading = false,
  submitButtonValue,
  globalError,
  isValid = () => true,
  onChange = () => {},
  onSubmit = () => {},
}) => {
  const { sizes: { big } } = useTheme();
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

      { globalError && <FormError>{ globalError }</FormError> }

      <Box my={big} style={{ alignSelf: 'center' }}>
        <Button type="submit" size="big" loading={loading} disabled={!valid}>{ submitButtonValue }</Button>
      </Box>

    </form>
  );
};

export default Form;
