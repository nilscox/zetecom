/** @jsx jsx */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

import { SortType } from 'src/types/SortType';

import Input from '../../elements/Input/Input';
import Pagination from '../../elements/Pagination/Pagination';

import SortMenu from './SortMenu/SortMenu';

const getTotalPages = (total?: number) => {
  if (total === undefined) {
    return;
  }

  return 1 + Math.floor(total / 10);
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type FiltersBarProps = {
  className?: string;
  search: string;
  sort?: SortType;
  page: number;
  total?: number;
  onSearch: (search: string) => void;
  onSort?: (sort: SortType) => void;
  onPageChange: (page: number) => void;
};

const FiltersBar: React.FC<FiltersBarProps> = ({
  className,
  search,
  sort,
  page,
  total,
  onSearch,
  onSort,
  onPageChange,
}) => (
  <Container className={className}>
    <Input
      large
      outlined
      fullWidth
      placeholder="Rechercher..."
      value={search}
      onChange={(e) => onSearch(e.currentTarget.value)}
      css={(theme) => ({ marginRight: theme.spacings[4] })}
    />
    {sort && onSort && <SortMenu sort={sort} onChange={onSort} css={(theme) => ({ marginRight: theme.spacings[4] })} />}
    <Pagination page={page} total={getTotalPages(total)} onPageChange={onPageChange} />
  </Container>
);

export default FiltersBar;
