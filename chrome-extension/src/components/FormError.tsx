import React from 'react';
import Typography from './Typography';

type FormErrorProps = {
  children?: string;
  style?: React.CSSProperties;
};

const FormError: React.FC<FormErrorProps> = ({ children, style }) => {
  return (
    <div style={{ margin: '2px 0', ...style }}>
      {children !== undefined ? (
        <Typography variant="error">{children}</Typography>
      ) : (
        <Typography variant="error">&nbsp;</Typography>
      )}
    </div>
  );
};

export default FormError;
