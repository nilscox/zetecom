import { AxiosRequestConfig } from 'axios';

import { SortType } from 'src/types/SortType';

const makeParams = (
  { page, sort, search }: { page?: number; sort?: SortType; search?: string },
  params: AxiosRequestConfig['params'] = {},
) => {
  if (page !== 1) {
    params.page = page;
  }

  if (sort) {
    params.sort = sort;
  }

  if (search !== '') {
    params.search = search;
  }

  return params;
};

export default makeParams;
