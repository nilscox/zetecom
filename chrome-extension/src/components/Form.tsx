import React, { useState } from 'react';

import FormField, { FormFieldProps } from './FormField';
import FormSubmit from './FormSubmit';
import FormError from './FormError';

type Omit<K, T> = Pick<T, Exclude<keyof T, K>>;

type FormProps = {
  fields: { [name: string]: Omit<'onTextChange', FormFieldProps> | JSX.Element };
  submitButtonValue: string;
  globalErrorMessage?: string;
  isValid?: boolean;
};

type FieldProps = Omit<'onTextChange', FormFieldProps> & {
  fieldKey: string;
};

const Form: React.FC<FormProps> = ({ fields, submitButtonValue, globalErrorMessage, isValid = true }) => {
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

    if (!isValid) return;
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
      onSubmit={handleSubmit}
    >
      {Object.keys(fields).map((key: string) =>
        React.isValidElement(fields[key]) ? (
          <div key={key}>{fields[key]}</div>
        ) : (
          <div key={key}>
            <FormField {...fields[key] as any} onTextChange={text => handleTextChange(key, text)} />
          </div>
        )
      )}
      <FormError style={{ textAlign: 'center', fontSize: '1rem' }}>{globalErrorMessage}</FormError>
      <FormSubmit disabled={!isValid} value={submitButtonValue} />
    </form>
  );
};

export default Form;
