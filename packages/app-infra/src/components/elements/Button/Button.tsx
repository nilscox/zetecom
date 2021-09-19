import { forwardRef } from 'react';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { Box, BoxOwnProps } from '~/components/layout/Box/Box';
import { color, fontWeight, Theme, transition } from '~/theme';

export type ButtonProps = React.ComponentPropsWithRef<typeof StyledButton> & {
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ loading, disabled, children, ...props }, ref) => (
  <StyledButton
    as="button"
    disabled={loading || disabled}
    paddingX={3}
    paddingY={2}
    borderRadius="default"
    {...props}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref={ref as any}
  >
    {children}
    {loading && <LoadingIndicator />}
  </StyledButton>
));

type StyledButtonProps = React.HTMLProps<HTMLButtonElement> &
  BoxOwnProps & {
    color?: keyof Theme['colors'];
  };

const StyledButton = styled(Box)<StyledButtonProps>`
  position: relative;
  outline: none;
  background: transparent;
  border: none;
  transition: ${transition(['color', 'background'], 'fast')};
  font-weight: ${fontWeight('medium')};
  color: ${(props) => color(props.color ?? 'textLight')};
  cursor: pointer;

  &:hover {
    background: ${color('muted')};
  }

  &:disabled {
    color: ${color('textDisabled')};
    background: transparent;
    cursor: initial;
  }
`;

const width = keyframes`
  from {
    width: 0;
    left: 0;
  }

  to {
    width: 0;
    right: 0;
  }

  50% {
    width: 100%;
  }
`;

const LoadingIndicator = styled.div`
  border-bottom: 2px solid ${color('primary')};
  animation: ${width} 720ms linear infinite;
  position: absolute;
  bottom: 0;
  right: 0;
`;
