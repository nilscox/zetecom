import React from 'react';

import styled from '@emotion/styled';

import { size, spacing } from 'src/theme';

import { First, Last, Next, Prev } from '../../icons';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';

const StyledPagination = styled.div`
  min-width: ${size('medium')};
  max-width: ${size('large')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Page = styled.span`
  margin-right: ${spacing(2)};
`;

const Total = styled.span`
  margin-left: ${spacing(2)};
`;

type PaginationProps = {
  page: number;
  total?: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, total, onPageChange }) => (
  <StyledPagination>
    <IconButton disabled={page === 1} onClick={() => onPageChange(1)}>
      <Icon as={First} />
    </IconButton>

    <IconButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
      <Icon as={Prev} />
    </IconButton>

    <div>
      <Page>{page}</Page>/<Total>{total ?? '-'}</Total>
    </div>

    <IconButton disabled={!total || page === total} onClick={() => onPageChange(page + 1)}>
      <Icon as={Next} />
    </IconButton>

    <IconButton disabled={!total || page === total} onClick={() => total && onPageChange(total)}>
      <Icon as={Last} />
    </IconButton>
  </StyledPagination>
);

export default Pagination;
