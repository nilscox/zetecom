import React, { ComponentProps } from 'react';

import styled from '@emotion/styled';
import { darken } from 'polished';

import { color, transition } from 'src/theme';

const Button = styled.button`
  border: none;
  padding: 0;
  outline: none;
  background: transparent;
  color: ${color('icon')};
  cursor: pointer;
  transition: ${transition('fast', 'color')};

  &:not(:disabled) {
    :active {
      color: ${color('icon', darken(0.2))};
    }
  }

  &:disabled {
    color: ${color('iconDisabled')};
    cursor: initial;
  }
`;

type IconButtonProps = ComponentProps<typeof Button>;

// prettier-ignore
const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => (
  <Button {...props}>
    {children}
  </Button>
);

export default IconButton;
