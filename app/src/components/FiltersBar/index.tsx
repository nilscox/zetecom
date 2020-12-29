import React, { useCallback } from 'react';

import { Grid } from '@material-ui/core';

import { SortType } from 'src/types/SortType';

import Pagination from './Pagination';
import SearchField from './SearchField';
import SortMenu from './SortMenu';

type FiltersBarProps = {
  className?: string;
  sort?: {
    type: SortType;
    onChange: (type: SortType) => void;
  };
  onSearch: (query: string) => void;
  page: number;
  pageSize: number;
  total?: number;
  onPageChange: (page: number) => void;
};

const FiltersBar: React.FC<FiltersBarProps> = ({ className, sort, onSearch, page, pageSize, total, onPageChange }) => {
  const totalPages = typeof total === 'number' ? Math.max(1, Math.ceil(total / pageSize)) : '-';

  const handleSearch = useCallback(
    (text: string) => {
      onSearch(text);
      onPageChange(1);
    },
    [onSearch, onPageChange],
  );

  const handleSort = (sortParam: SortType) => {
    sort.onChange(sortParam);
    onPageChange(1);
  };

  return (
    <Grid container className={className}>
      <Grid item style={{ flexGrow: 1 }}>
        <SearchField onSearch={handleSearch} />
      </Grid>

      {sort && <SortMenu sort={sort.type} onSortChange={handleSort} />}

      <Grid item>
        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </Grid>
    </Grid>
  );
};

export default FiltersBar;
