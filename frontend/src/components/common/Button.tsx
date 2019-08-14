import React from 'react';

import Text, { TextProps } from 'src/components/common/Text';

export type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'size'> & {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  size?: TextProps['size'];
  color?: TextProps['color'];
  text?: TextProps;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  disabled,
  size,
  color,
  text,
  style,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        border: 'none',
        background: 'none',
        outline: 'none',
        ...style,
      }}
      {...props}
    >

      <Text
        variant="button"
        size={size}
        color={disabled ? 'disabled' : color}
        style={{
          cursor: disabled ? 'initial' : 'pointer',
          ...(text && text.style),
        }}
        {...text}
      >
        { children }
      </Text>

    </button>
  );
};

export default Button;
