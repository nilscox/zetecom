import styled from '@emotion/styled';
import { applyStatics, Menu as ReactMenu, MenuItem as ReactMenuItem } from '@szhsin/react-menu';

import { color, fontWeight } from '~/theme';

import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export const Menu = styled(ReactMenu)``;

Menu.defaultProps = { transition: true };

const StyledMenuItem = styled(ReactMenuItem)<{ selected?: boolean }>`
  font-weight: ${({ selected }) => fontWeight(selected ? 'bold' : undefined)};
  color: ${({ selected }) => (selected ? color('secondary') : undefined)};

  &:hover {
    background-color: ${color('backgroundLight')};
  }

  &:active {
    background-color: ${color('backgroundLight')};
    color: inherit;
  }
`;

export const MenuItem = applyStatics(ReactMenuItem)(StyledMenuItem) as React.ComponentType<
  React.ComponentProps<typeof StyledMenuItem>
>;
