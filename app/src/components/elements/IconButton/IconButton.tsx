import React, { ComponentProps, forwardRef } from 'react';

import styled from '@emotion/styled';

import { borderRadius, color, transition } from 'src/theme';

const Button = styled.button`
  border: none;
  border-radius: ${borderRadius(1)};
  padding: 0;
  outline: none;
  background: transparent;
  color: ${color('icon')};
  cursor: pointer;
  transition: ${transition('fast', 'background')};

  &:not(:disabled) {
    :active {
      transition: none;
      background: ${color('light')};
    }
  }

  &:disabled {
    color: ${color('iconDisabled')};
    cursor: initial;
  }
`;

export type IconButtonProps = ComponentProps<typeof Button>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ children, ...props }, ref) => (
  <Button ref={ref} {...props}>
    {children}
  </Button>
));

IconButton.displayName = 'IconButton';

export default IconButton;
