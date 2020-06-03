import React from 'react';

import { SortType } from 'src/types/SortType';

import PaginatedList from './index';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

export default { title: 'PaginatedList' };

export const paginatedList = () => (
  <PaginatedList
    sort={{
      type: SortType.DATE_ASC,
      onChange: () => {},
    }}
    onSearch={action('search')}
    page={number('page', 2)}
    pageSize={10}
    total={number('total', 35)}
    onPageChange={action('page change')}
  />
);
