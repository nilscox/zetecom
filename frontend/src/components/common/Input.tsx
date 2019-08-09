import React from 'react';

import { useTheme } from 'src/utils/Theme';

type InputProps = React.HTMLProps<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ style, ...props }) => {
  const { sizes: { medium }, colors: { border }, borderRadiusInput: borderRadius } = useTheme();

  return (
    <input
      style={{
        padding: medium,
        border: `1px solid ${border}`,
        borderRadius,
        outline: 'none',
        ...style,
      }}
      {...props}
    />
  );
};

export default Input;
