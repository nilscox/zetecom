import { forwardRef, SVGProps } from 'react';

import styled from '@emotion/styled';

import { color } from '~/theme';

import { Button } from '../Button/Button';
import { Icon, IconProps } from '../Icon/Icon';

type IconButtonProps = React.ComponentProps<typeof StyledButton> &
  Pick<IconProps, 'size'> & {
    as: React.ComponentType<SVGProps<SVGSVGElement>>;
  };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ as, size, ...props }, ref) => (
  <StyledButton marginX paddingX={0} paddingY={0} type="button" {...props} ref={ref}>
    <StyledIcon as={as} size={size} />
  </StyledButton>
));

const StyledButton = styled(Button)`
  padding: 0;
  transition-property: color, background;
  transition-duration: 300ms;
  transition-timing-function: ease;
  color: ${(props) => color(props.color ?? 'icon')};

  &:hover {
    color: ${color('iconHover')};
    background: inherit;
  }

  &:disabled {
    color: ${color('iconDisabled')};
  }
`;

const StyledIcon = styled(Icon)`
  display: block;
  color: inherit;
`;
