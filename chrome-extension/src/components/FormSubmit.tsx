import React from 'react';

export type FormSubmitProps = {
  value: string;
};

const FormSubmit: React.FC<FormSubmitProps> = ({ value }) => {
  return (
    <button
      type="submit"
      style={{
        padding: '10px 15px',
        margin: 10,
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#444',
        textTransform: 'uppercase',
        border: '1px solid #ccc',
        background: '#eee',
        borderRadius: '2px',
        alignSelf: 'center'
      }}
    >
      {value}
    </button>
  );
};

export default FormSubmit;
