import React from 'react';

export type FormSubmitProps = {
  value: string;
  disabled?: boolean;
};

const FormSubmit: React.FC<FormSubmitProps> = ({ value, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        padding: '10px 15px',
        margin: 10,
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        border: '1px solid #ccc',
        background: '#eee',
        borderRadius: '2px',
        alignSelf: 'center',
        color: disabled ? '#888' : '#444',
        cursor: disabled ? 'initial' : 'pointer'
      }}
    >
      {value}
    </button>
  );
};

export default FormSubmit;
