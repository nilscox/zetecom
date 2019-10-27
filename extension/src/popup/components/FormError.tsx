import React from 'react';

import Text from 'src/components/common/Text';

type FormErrorProps = {
  children?: string;
  style?: React.CSSProperties;
};

const FormError: React.FC<FormErrorProps> = ({ children, style }) => {
  return (
    <div style={{ margin: '2px 0', ...style }}>
      <Text variant="error">{children}</Text>
    </div>
  );
};

export default FormError;
