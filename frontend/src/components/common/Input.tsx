import React from 'react';

import { useTheme } from 'src/utils/Theme';
import FormError from 'src/components/common/FormError';

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  fullWidth?: boolean;
  error?: string;
};

const Input: React.FC<InputProps> = ({ fullWidth, error, style, ...props }) => {
  const { sizes: { medium }, colors: { border }, borderRadiusInput: borderRadius } = useTheme();

  return (
    <>
      { error && <FormError>{ error }</FormError> }
      <input
        style={{
          padding: medium,
          boxSizing: 'border-box',
          border: `1px solid ${border}`,
          borderRadius,
          outline: 'none',
          ...(fullWidth && { width: '100%' }),
          ...style,
        }}
        {...props}
      />
    </>
  );
};

export default Input;
