import React, { useCallback } from 'react';

import { SortType } from 'src/types/SortType';

import Pagination from './Pagination';
import SearchField from './SearchField';
import SortMenu from './SortMenu';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pagination: {
    [theme.breakpoints.down('md')]: {
      flexGrow: 1,
    },
  },
}));

type PaginatedListProps = {
  sort?: {
    type: SortType;
    onChange: (type: SortType) => void;
  };
  onSearch: (query: string) => void;
  page: number;
  pageSize: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};

const PaginatedList: React.FC<PaginatedListProps> = ({
  sort,
  onSearch,
  page,
  totalPages,
  pageSize,
  onPageChange,
  children,
}) => {
  const classes = useStyles();

  const handleSearch = useCallback((text: string) => {
    onSearch(text);
    onPageChange(1);
  }, [onSearch, onPageChange]);

  const handleSort = (sortParam: SortType) => {
    sort.onChange(sortParam);
    onPageChange(1);
  };

  return (
    <>

      <Grid container>

        <Grid item style={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item style={{ flexGrow: 1 }}>
              <SearchField onSearch={handleSearch} />
            </Grid>
            { sort && (
              <Grid item>
                <SortMenu sort={sort.type} onSortChange={handleSort} />
              </Grid>
            ) }
          </Grid>
        </Grid>

        <Grid item md={3} className={classes.pagination}>
          <Pagination page={page} total={totalPages} pageSize={pageSize} onPageChange={onPageChange} />
        </Grid>

      </Grid>

      { children }

    </>
  );
};

export default PaginatedList;
