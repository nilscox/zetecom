import React, { useState, ChangeEvent } from 'react';

import FormError from './FormError';

export type FormFieldProps = React.PropsWithoutRef<JSX.IntrinsicElements['input']> & {
  errorMessage?: string;
  onTextChange: (text: string) => void;
};

const FormField: React.FC<FormFieldProps> = ({
  errorMessage,
  onTextChange,
  ...props
}) => {
  const [value, setValue] = useState('');

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onTextChange(e.target.value);
  };

  return (
    <div
      style={{
        marginBottom: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <FormError style={{ textAlign: 'right' }}>{errorMessage}</FormError>
      <input
        style={{
          padding: '5px 10px',
          borderRadius: '2px',
          border: '1px solid #ccc',
        }}
        value={value}
        onChange={e => handleTextChange(e)}
        {...props}
      />
    </div>
  );
};

export default FormField;
