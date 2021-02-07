import React, { ComponentProps } from 'react';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { transparentize } from 'polished';

import { borderRadius, color, fontSize, spacing, textColor, transition } from 'src/theme';

import LoadingIndicator from './LoadingIndicator';

const StyledButton = styled.button`
  position: relative;
  border: none;
  border-radius: ${borderRadius(1)};
  outline: none;
  padding: ${spacing(1, 2)};
  background-color: transparent;
  color: ${textColor('default')};
  font-size: ${fontSize('default')};
  font-weight: bold;
  transition: ${transition('fast')};
  cursor: pointer;

  &:not(:disabled) {
    :hover,
    :focus {
      background-color: ${color('secondary', transparentize(0.9))};
    }

    :active {
      box-shadow: 0 0 2px ${color('secondary', transparentize(0.4))};
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

const Button: React.FC<ButtonProps> = ({ size, loading, disabled, children, ...props }) => (
  <>
    <StyledButton disabled={disabled ?? loading} {...props} className={clsx(size, props.className)}>
      {children}
      {loading && <LoadingIndicator />}
    </StyledButton>
  </>
);

export default Button;
