import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { IconButton } from '~/components/elements/IconButton/IconButton';
import { First, Last, Next, Prev } from '~/components/icons';
import { Flex } from '~/components/layout/Flex/Flex';
import { breakpoints, spacing } from '~/theme';

export type PaginationProps = {
  page: number;
  total?: number;
  onFirst?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onLast?: () => void;
};

export const Pagination: React.FC<PaginationProps> = ({ page, total: totalProp, onFirst, onPrev, onNext, onLast }) => {
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
        as={First}
        size={5}
        title="Première page"
        disabled={!onFirst}
        onClick={onFirst}
      />

      {/* prettier-ignore */}
      <IconButton
        as={Prev}
        size={5}
        title="Page précédente"
        disabled={!onPrev}
        onClick={onPrev}
      />

      <div>
        <Page data-testid="current-page">{page}</Page> / <Total data-testid="total-pages">{total ?? '-'}</Total>
      </div>

      {/* prettier-ignore */}
      <IconButton
        as={Next}
        size={5}
        title="Page suivante"
        disabled={!onNext}
        onClick={onNext}
      />

      {/* prettier-ignore */}
      <IconButton
        as={Last}
        size={5}
        title="Dernière page"
        disabled={!onLast}
        onClick={onLast}
      />
    </StyledPagination>
  );
};

const StyledPagination = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 180px;
  max-width: 280px;
  white-space: nowrap;

  ${breakpoints.down('small')} {
    min-width: 140px;
  }
`;

const Page = styled.span`
  margin-right: ${spacing(2)};
`;

const Total = styled.span`
  margin-left: ${spacing(2)};
`;
