import React from 'react';

import { SortType } from 'src/types/SortType';
import { useTheme } from 'src/utils/Theme';

import Flex from './Flex';
import Input from './Input';
import Box from './Box';
import SortSelect from './SortSelect';

type FilterBarProps = {
  disabled: boolean;
  after?: React.ReactNode;
  onSearch: (search: string) => void;
  onSort: (sort: SortType) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ disabled, after, onSearch, onSort }) => {
  const { sizes } = useTheme();

  return (
    <Flex my={sizes.big} flexDirection="row" alignItems="center">

      <Input
        type="text"
        placeholder="Rechercher..."
        disabled={disabled}
        style={{ flex: 1, marginRight: sizes.big, background: 'transparent' }}
        onChange={e => onSearch(e.currentTarget.value)}
      />

      <Box mr={sizes.big}>
        <SortSelect disabled={disabled} onChange={onSort} />
      </Box>

      { after }

    </Flex>
  );
};

export default FilterBar;
