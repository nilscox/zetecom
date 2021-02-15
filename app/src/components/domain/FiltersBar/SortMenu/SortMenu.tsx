import React, { ComponentProps, forwardRef } from 'react';

import Icon from 'src/components/elements/Icon/Icon';
import IconButton from 'src/components/elements/IconButton/IconButton';
import Menu, { MenuItem } from 'src/components/elements/Menu/Menu';
import { Sort } from 'src/components/icons';
import { SortType } from 'src/types/SortType';

const labels: Record<SortType, string> = {
  [SortType.DATE_DESC]: 'Les plus récents en premier',
  [SortType.DATE_ASC]: 'Les plus anciens en premier',
  [SortType.RELEVANCE]: 'Les plus pertinents en premier',
};

const SortButton = forwardRef<HTMLButtonElement, ComponentProps<typeof IconButton>>((props, ref) => (
  <IconButton ref={ref} {...props}>
    <Icon as={Sort} />
  </IconButton>
));

SortButton.displayName = 'SortButton';

type SortMenuProps = {
  className?: string;
  sort: SortType;
  onChange: (sort: SortType) => void;
};

const SortMenu: React.FC<SortMenuProps> = ({ className, sort, onChange }) => (
  <Menu menuButton={<SortButton className={className} />}>
    {Object.values(SortType).map(type => (
      <MenuItem key={type} disabled={sort === type} onClick={() => onChange(type)}>
        {labels[type]}
      </MenuItem>
    ))}
  </Menu>
);

export default SortMenu;
