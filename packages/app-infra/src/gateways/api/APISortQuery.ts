import { SortType } from '@zetecom/app-core';

const sortQueryMap = {
  [SortType.dateAsc]: 'date-asc',
  [SortType.dateDesc]: 'date-desc',
  [SortType.relevance]: 'relevance',
};

export const transformSortQuery = (sort: SortType): string => {
  return sortQueryMap[sort];
};
