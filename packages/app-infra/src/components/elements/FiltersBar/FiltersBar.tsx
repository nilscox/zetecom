import React from 'react';

import IconSort from '~/components/icons/Sort.svg';

import { SortType } from '~/../../app-core/src';
import { IconButton } from '~/components/elements/IconButton/IconButton';
import { Input } from '~/components/elements/Input/Input';
import { Pagination, PaginationProps } from '~/components/elements/Pagination/Pagination';
import { Flex } from '~/components/layout/Flex/Flex';

import { Menu, MenuItem } from '../Menu/Menu';

type FiltersBarProps = {
  onSearch: (text: string) => void;
  sort?: SortType;
  onSort?: (sort: SortType) => void;
  pagination: PaginationProps;
};

export const FiltersBar: React.FC<FiltersBarProps> = ({ onSearch, sort, onSort, pagination }) => (
  <Flex direction="row" columnGap={4}>
    <Input
      fullWidth
      large
      outlined
      type="search"
      placeholder="Rechercher..."
      onChange={(e) => onSearch(e.target.value)}
    />
    {sort && onSort && (
      <Flex justifyContent="center" alignItems="center">
        <SortMenu sort={sort} setSort={onSort} />
      </Flex>
    )}
    <Pagination {...pagination} />
  </Flex>
);

type SortMenuProps = {
  sort: SortType;
  setSort: (sort: SortType) => void;
};

const SortMenu: React.FC<SortMenuProps> = ({ sort, setSort }) => {
  const button = <IconButton as={IconSort} size={5} title="Trier les commentaires" />;

  return (
    <Menu menuButton={button}>
      <MenuItem selected={sort === SortType.dateDesc} onClick={() => setSort(SortType.dateDesc)}>
        Les plus récents en premier
      </MenuItem>

      <MenuItem selected={sort === SortType.dateAsc} onClick={() => setSort(SortType.dateAsc)}>
        Les plus anciens en premier
      </MenuItem>

      <MenuItem selected={sort === SortType.relevance} onClick={() => setSort(SortType.relevance)}>
        Les plus pertinents en premier
      </MenuItem>
    </Menu>
  );
};
