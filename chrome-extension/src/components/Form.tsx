import React, { useState } from 'react';

import FormField, { FormFieldProps } from './FormField';
import FormSubmit from './FormSubmit';
import FormError from './FormError';

type Omit<K, T> = Pick<T, Exclude<keyof T, K>>;

type FormProps = {
  fields: { [name: string]: Omit<'onTextChange', FormFieldProps> };
  submitButtonValue: string;
  globalErrorMessage?: string;
};

type FieldProps = Omit<'onTextChange', FormFieldProps> & {
  key: string;
};

const Form: React.FC<FormProps> = ({ fields, submitButtonValue, globalErrorMessage }) => {
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

  const Field: React.FC<FieldProps> = ({ key, ...props }) => (
    <FormField {...props} onTextChange={text => handleTextChange(key, text)} />
  );

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
    >
      {Object.keys(fields).map(key => (
        <Field key={key} {...fields[key]} />
      ))}
      <FormError style={{ textAlign: 'center', fontSize: '1rem' }}>{globalErrorMessage}</FormError>
      <FormSubmit value={submitButtonValue} />
    </form>
  );
};

export default Form;
