import styled from '@emotion/styled';

import { Box } from '~/components/layout/Box/Box';
import { Flex } from '~/components/layout/Flex/Flex';
import { border, color, spacing, transition } from '~/theme';

import { Button } from '../Button/Button';

export const Tabs = styled(Flex)`
  border-bottom: ${border('light')};
`;

Tabs.defaultProps = {
  role: 'tablist',
};

export const Tab = styled(Button)<{ active?: boolean }>`
  margin: ${spacing(0, 2)};
  padding: ${spacing(2, 3, 1)};
  border-radius: 0;
  border-bottom: 2px solid;
  border-color: ${({ active }) => (active ? color('primary') : 'transparent')};
  transition: ${transition('border', 'fast')};

  &:hover {
    background-color: transparent;
  }

  &:focus-visible {
    color: ${color('link')};
  }

  &.selected {
    border-color: ${color('primary')};
  }
`;

Tab.defaultProps = {
  type: 'button',
  role: 'tab',
};

export const TabPanel = styled(Box)``;

TabPanel.defaultProps = {
  role: 'tabpanel',
};
