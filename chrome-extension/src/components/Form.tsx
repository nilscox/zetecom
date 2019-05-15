import React, { useState } from 'react';

import FormField, { FormFieldProps } from './FormField';
import FormSubmit from './FormSubmit';
import FormError from './FormError';

type Omit<K, T> = Pick<T, Exclude<keyof T, K>>;

type FormField = Omit<'onTextChange', FormFieldProps>;

type FormProps = {
  fields: { [name: string]: FormField | JSX.Element };
  submitButtonValue: string;
  globalErrorMessage?: string;
  isValid?: boolean;
  isLoading?: boolean;
  onSubmit: (values: { [fields: string]: string }) => void;
};

type FieldProps = FormField & {
  fieldKey: string;
};

const Form: React.FC<FormProps> = ({
  fields,
  submitButtonValue,
  globalErrorMessage,
  isLoading = false,
  isValid = true,
  onSubmit,
}) => {
  const [values, setValues] = useState<{ [name: string]: string }>(
    Object.keys(fields).reduce((o: { [name: string]: string }, k: string) => {
      o[k] = '';
      return o;
    }, {})
  );

  const handleTextChange = (key: string, text: string) => {
    const updatedValues = values;
    updatedValues[key] = text;

    setValues(updatedValues);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isValid)
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
          <FormField
            key={key}
            {...fields[key] as FormField}
            onTextChange={(text) => handleTextChange(key, text)}
          />
        )
      )}
      <FormError style={{ textAlign: 'center', fontSize: '1rem' }}>{globalErrorMessage}</FormError>
      <FormSubmit disabled={!isValid} value={submitButtonValue} isLoading={isLoading} />
    </form>
  );
};

export default Form;
