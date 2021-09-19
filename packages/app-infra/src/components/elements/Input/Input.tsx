import React, { ComponentProps } from 'react';

import styled from '@emotion/styled';
import cx from 'classnames';

import { color, fontSize, radius, spacing, transition } from '~/theme';

import { FormError } from '../FormError/FormError';

export type InputProps = ComponentProps<typeof StyledInput> & {
  large?: boolean;
  outlined?: boolean;
  fullWidth?: boolean;
  error?: React.ReactNode;
  consistentHeight?: boolean;
  onTextChange?: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  className,
  large,
  outlined,
  fullWidth,
  error,
  consistentHeight,
  onTextChange,
  ...props
}) => (
  <>
    <StyledInput
      className={cx(large && 'large', outlined && 'outlined', fullWidth && 'full-width', className)}
      onChange={(event) => onTextChange?.(event.target.value)}
      {...props}
    />
    <FormError error={error} consistentHeight={consistentHeight} />
  </>
);

const StyledInput = styled.input`
  border: none;
  border-bottom: 2px solid ${color('border')};
  padding: ${spacing(2, 0)};
  outline: none;
  font-size: ${fontSize(1)};
  color: ${color('text')};
  box-sizing: border-box;
  transition: ${transition('border-bottom-color', 'fast')};

  &.outlined {
    padding: ${spacing(2, 3)};
    border-top: 1px solid ${color('border')};
    border-left: 1px solid ${color('border')};
    border-right: 1px solid ${color('border')};
    border-radius: ${radius('default')};
  }

  &.large {
    padding: ${spacing(3)};
  }

  &.full-width {
    width: 100%;
  }

  &:hover,
  &:focus {
    border-bottom-color: ${color('primary')};
  }

  &:disabled {
    border-bottom-color: ${color('border')};
    background-color: ${color('muted')};
    color: ${color('textDisabled')};
  }
`;
