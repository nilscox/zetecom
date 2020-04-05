import React, { useState } from 'react';

import { SortType } from 'src/types/SortType';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';

type SortMenuProps = {
  sort: SortType;
  onSortChange: (sort: SortType) => void;
};

const SortMenu: React.FC<SortMenuProps> = ({ sort: currentSort, onSortChange }) => {
  const [buttonRef, setButtonRef] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setButtonRef(e.currentTarget);
  const setSort = (sort: SortType) => () => {
    onSortChange(sort);
    setButtonRef(null);
  };

  const menuText = {
    [SortType.DATE_DESC]: 'Les plus récentes en premier',
    [SortType.DATE_ASC]: 'Les plus anciennes en premier',
    [SortType.RELEVANCE]: 'Les plus pertinentes en premier',
  };

  return (
    <>

      <IconButton onClick={handleClick} style={{ background: 'transparent' }}>
        <SortIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={buttonRef}
        keepMounted
        open={Boolean(buttonRef)}
        onClose={() => setButtonRef(null)}
      >
        { [SortType.DATE_DESC, SortType.DATE_ASC, SortType.RELEVANCE].map(sort => (
          <MenuItem key={sort} disabled={sort === currentSort} onClick={setSort(sort)}>{ menuText[sort] }</MenuItem>
        )) }
      </Menu>

    </>
  );
};

export default SortMenu;
