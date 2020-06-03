import React from 'react';

import { useTheme } from 'src/theme/Theme';

type TextAreaProps = React.HTMLProps<HTMLTextAreaElement> & {
  fullWidth?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({ fullWidth = false, style, ...props }) => {
  const { sizes: { medium }, colors: { border }, borderRadiusInput: borderRadius } = useTheme();

  return (
    <textarea
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
  );
};

export default TextArea;
