import React from 'react';

import Loader from 'src/components/common/Loader';

export type FormSubmitProps = {
  value: string;
  isLoading?: boolean;
  disabled?: boolean;
};

const FormSubmit: React.FC<FormSubmitProps> = ({ value, isLoading = false, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={{
        padding: '10px 15px',
        width: '240px',
        margin: 10,
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        border: '1px solid #ccc',
        background: '#eee',
        borderRadius: '2px',
        alignSelf: 'center',
        color: disabled ? '#888' : '#444',
        cursor: disabled ? 'initial' : 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      { value }
      { isLoading && (
        <div style={{ width: 0 }}>
          <div style={{ width: 30 }}>
            <Loader size="small" style={{ marginLeft: 10 }} />
          </div>
        </div>
      ) }
    </button>
  );
};

export default FormSubmit;
