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
        fontSize: '0.9rem',
        border: '1px solid #ccc',
        borderRadius: '2px',
        alignSelf: 'center'
      }}
    >
      {value}
    </button>
  );
};

export default FormSubmit;
