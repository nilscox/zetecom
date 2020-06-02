import React from 'react';

import Loader from 'src/components/Loader';
import Text, { TextProps } from 'src/components/Text';

export type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'size'> & {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  loading?: boolean;
  size?: TextProps['size'];
  color?: TextProps['color'];
  text?: TextProps;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  disabled,
  loading,
  size,
  color,
  text: { style: textStyle, ...textProps } = {},
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
        position: 'relative',
        ...style,
      }}
      {...props}
    >

      <Text
        variant="button"
        size={size}
        color={disabled ? 'disabled' : color}
        style={{
          cursor: loading || disabled ? 'initial' : 'pointer',
          visibility: loading ? 'hidden' : 'visible',
          ...(textStyle),
        }}
        {...textProps}
      >
        { children }
      </Text>

      { loading && (
        <Loader
          size="small"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      ) }

    </button>
  );
};

export default Button;
