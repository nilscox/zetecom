import React from 'react';

import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';

import { SortType } from 'src/types/SortType';

import PaginatedList from './index';

export default { title: 'PaginatedList' };

export const paginatedList = () => (
  <PaginatedList
    sort={{
      type: SortType.DATE_ASC,
      onChange: action('sort change'),
    }}
    onSearch={action('search')}
    page={number('page', 3)}
    pageSize={10}
    total={number('total', 45)}
    onPageChange={action('page change')}
  />
);
