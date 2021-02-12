import React from 'react';

import styled from '@emotion/styled';
import clsx from 'clsx';

import { color, spacing } from 'src/theme';

import Button from '../Button/Button';

export const useTabs = <T extends string>(tabs: T[], initial?: T): [T, Record<T, TabProps>] => {
  const [current, setCurrent] = React.useState(initial ?? tabs[0]);

  const tabsProps = tabs.reduce(
    (obj, tab) => ({
      ...obj,
      [tab]: {
        'aria-controls': tab,
        selected: current === tab,
        onClick: () => setCurrent(tab),
      },
    }),
    {} as Record<T, TabProps>,
  );

  return [current, tabsProps];
};

const StyledTab = styled(Button)`
  margin: ${spacing(0, 1)};
  padding: ${spacing(0.5, 2)};
  border-radius: unset;
  border-bottom: 2px solid transparent;

  &&:hover {
    background-color: transparent;
  }

  &&:active {
    box-shadow: none;
  }

  &.selected {
    border-bottom: 2px solid ${color('primary')};
  }
`;

type TabProps = {
  selected: boolean;
  onClick: () => void;
};

export const Tab: React.FC<TabProps> = ({ selected, onClick, children }) => (
  <StyledTab className={clsx(selected && 'selected')} role="tab" aria-selected={selected} onClick={onClick}>
    {children}
  </StyledTab>
);

const Tabs = styled.div`
  border-bottom: 1px solid ${color('border')};
`;

Tabs.defaultProps = {
  role: 'tablist',
};

export default Tabs;
