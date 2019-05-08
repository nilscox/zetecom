import React, { useState, ChangeEvent } from 'react';

import FormError from './FormError';

export type FormFieldProps = {
  type: string;
  placeholder?: string;
  errorMessage?: string;
  onTextChange: (text: string) => void;
};

const FormField: React.FC<FormFieldProps> = ({ type, placeholder, errorMessage, onTextChange }) => {
  const [value, setValue] = useState('');

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onTextChange(value);
  };

  return (
    <div style={{ marginBottom: '5px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <FormError style={{ textAlign: 'right' }}>{errorMessage}</FormError>
      <input
        style={{ padding: '5px 10px', borderRadius: '2px', border: '1px solid #ccc' }}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => handleTextChange(e)}
      />
    </div>
  );
};

export default FormField;
