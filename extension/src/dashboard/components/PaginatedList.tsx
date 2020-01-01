import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Flex from 'src/components/common/Flex';
import SearchField from './SearchField';
import Pagination from './Pagination';
import { SortType } from 'src/types/SortType';
import SortMenu from './SortMenu';

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

  return (
    <>
      <Flex className={classes.container}>

        <Flex flexDirection="row" flex={1}>
          <SearchField onSearch={onSearch} />
          { sort && <SortMenu sort={sort.type} onSortChange={sort.onChange} /> }
        </Flex>

        <Pagination page={page} total={totalPages} pageSize={pageSize} onPageChange={onPageChange} />

      </Flex>

      { children }

    </>
  );
};

export default PaginatedList;
