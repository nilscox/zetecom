import React, { ComponentProps, forwardRef } from 'react';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { transparentize } from 'polished';

import useForwardRef from 'src/hooks/useForwardRef';
import { borderRadius, color, fontSize, fontWeight, spacing, textColor, transition } from 'src/theme';

import LoadingIndicator from './LoadingIndicator';

const StyledButton = styled.button`
  position: relative;
  border: none;
  border-radius: ${borderRadius(1)};
  padding: ${spacing(1, 2)};
  background-color: transparent;
  color: ${textColor('button')};
  font-size: ${fontSize('default')};
  font-weight: ${fontWeight('bold')};
  transition: ${transition('fast')};
  cursor: pointer;

  &:not(:disabled) {
    :hover,
    :focus {
      background-color: ${color('secondary', transparentize(0.9))};
    }

    :active {
      box-shadow: 0 0 2px ${color('secondary', transparentize(0.4))};
      transition: none;
    }
  }

  &:disabled {
    color: ${textColor('disabled')};
    cursor: initial;
  }

  &.large {
    font-size: ${fontSize('large')};
    padding: ${spacing(1, 3)};
  }
`;

type ButtonProps = ComponentProps<typeof StyledButton> & {
  size?: 'large';
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, loading, disabled, children, ...props }, forwardedRef) => {
    const ref = useForwardRef(forwardedRef);

    return (
      <StyledButton
        ref={ref}
        disabled={disabled ?? loading}
        onMouseUp={() => ref.current?.blur()}
        {...props}
        className={clsx(size, props.className)}
      >
        {children}
        {loading && <LoadingIndicator />}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
