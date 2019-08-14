import React from 'react';

import { useTheme } from 'src/utils/Theme';

type SelectProps = React.HTMLProps<HTMLSelectElement> & {
  values: { [key: string]: string };
  fullWidth?: boolean;
};

const Select: React.FC<SelectProps> = ({ values, fullWidth = false, style, ...props }) => {
  const { sizes: { small, medium }, colors: { border }, borderRadiusInput: borderRadius } = useTheme();

  return (
    <select
      style={{
        padding: `${small}px ${medium}px`,
        background: 'transparent',
        outline: 'none',
        border: `1px solid ${border}`,
        borderRadius,
        ...(fullWidth && { width: '100%' }),
        ...style,
      }}
      {...props}
    >
      { Object.keys(values).map(key => (
        <option key={key} value={key}>{ values[key] }</option>
      )) }
    </select>
  );
};

export default Select;
