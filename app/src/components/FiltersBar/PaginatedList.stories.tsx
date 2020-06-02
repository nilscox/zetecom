import React, { ReactNode } from 'react';

import { SortType } from 'src/types/SortType';
import createTheme from 'src/utils/createDefaultTheme';

import PaginatedList from './index';

import { ThemeProvider } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'PaginatedList',
  decorators: [
    withKnobs,
    (storyFn: () => ReactNode) => <ThemeProvider theme={createTheme()}>{ storyFn() }</ThemeProvider>,
  ],
};

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
