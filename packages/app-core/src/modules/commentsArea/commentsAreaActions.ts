import { SortType } from '../../entities/SortType';
import { createAction } from '../../store/createAction';

export const setCurrentCommentsArea = (commentsAreaId: string) => {
  return createAction('setCurrentCommentsArea', { commentsAreaId });
};

export const setFetchingCommentsArea = (fetching: boolean) => {
  return createAction('setFetchingCommentsArea', { fetching });
};

export const setFetchingComments = (fetching: boolean) => {
  return createAction('setFetchingComments', { fetching });
};

export const setCommentsPage = (page: number) => {
  return createAction('setCommentsPage', { page });
};

export const setCommentsSort = (sort: SortType) => {
  return createAction('setCommentsSort', { sort });
};

export const setCommentsSearchQuery = (searchQuery: string | undefined) => {
  return createAction('setCommentsSearchQuery', { searchQuery });
};

export type CommentsAreaActions = ReturnType<
  | typeof setCurrentCommentsArea
  | typeof setFetchingCommentsArea
  | typeof setFetchingComments
  | typeof setCommentsPage
  | typeof setCommentsSort
  | typeof setCommentsSearchQuery
>;
