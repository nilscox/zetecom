import { useState } from 'react';

import { SortType } from '@zetecom/app-core';

import { check } from '~/utils/check';

import { Demo } from '../../../demos';

import { FiltersBar } from './FiltersBar';

export const filtersBar: Demo = {
  render: () => {
    const [sort, setSort] = useState(SortType.relevance);
    const [page, setPage] = useState(1);

    return (
      <FiltersBar
        // eslint-disable-next-line no-console
        onSearch={console.log}
        sort={sort}
        onSort={setSort}
        pagination={{
          page,
          total: 14,
          onFirst: check(page > 1, () => setPage(1)),
          onPrev: check(page > 1, () => setPage(page - 1)),
          onNext: check(page < 14, () => setPage(page + 1)),
          onLast: check(page < 14, () => setPage(14)),
        }}
      />
    );
  },
};
