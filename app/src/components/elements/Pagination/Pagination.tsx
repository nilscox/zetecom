import React, { useEffect, useState } from 'react';

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

const Pagination: React.FC<PaginationProps> = ({ page, total: totalProp, onPageChange }) => {
  const [total, setTotal] = useState(totalProp);

  useEffect(() => {
    if (totalProp !== undefined) {
      setTotal(totalProp);
    }
  }, [totalProp]);

  return (
    <StyledPagination>
      {/* prettier-ignore */}
      <IconButton
        disabled={page === 1}
        title="Première page"
        onClick={() => onPageChange(1)}
      >
        <Icon as={First} />
      </IconButton>

      {/* prettier-ignore */}
      <IconButton
        disabled={page === 1}
        title="Page précédente"
        onClick={() => onPageChange(page - 1)}
      >
        <Icon as={Prev} />
      </IconButton>

      <div>
        <Page data-testid="current-page">{page}</Page> / <Total data-testid="total-pages">{total ?? '-'}</Total>
      </div>

      {/* prettier-ignore */}
      <IconButton
        disabled={!total || page === total}
        title="Page suivante"
        onClick={() => onPageChange(page + 1)}
        >
        <Icon as={Next} />
      </IconButton>

      {/* prettier-ignore */}
      <IconButton
        disabled={!total || page === total}
        title="Dernière page"
        onClick={() => total && onPageChange(total)}
      >
        <Icon as={Last} />
      </IconButton>
    </StyledPagination>
  );
};

export default Pagination;
