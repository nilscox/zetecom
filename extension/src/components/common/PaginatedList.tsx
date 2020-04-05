import React from 'react';

import Flex from 'src/components/common/Flex';
import { SortType } from 'src/types/SortType';
import { useTheme } from 'src/utils/Theme';

import Pagination from '../../dashboard/components/Pagination';
import SearchField from '../../dashboard/components/SearchField';
import SortMenu from '../../dashboard/components/SortMenu';

import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
  return ({
    container: {
      flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
  });
});

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
  const classes = useStyles({});
  const { sizes: { medium } } = useTheme();

  return (
    <>
      <Flex className={classes.container}>

        <Flex my={medium} flexDirection="row" alignItems="center" flex={1}>
          <SearchField onSearch={onSearch} />
          { sort && <SortMenu sort={sort.type} onSortChange={sort.onChange} /> }
          <Pagination page={page} total={totalPages} pageSize={pageSize} onPageChange={onPageChange} />
        </Flex>

      </Flex>

      { children }

    </>
  );
};

export default PaginatedList;
