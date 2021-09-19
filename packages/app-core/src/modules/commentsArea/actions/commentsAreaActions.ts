import { CommentsArea, SortType } from '../../../entities';
import { createAction } from '../../../store/createAction';

export const setCommentsAreas = (commentsAreas: CommentsArea[]) => {
  return createAction('setCommentsAreas', { commentsAreasIds: commentsAreas.map(({ id }) => id) });
};

export const setTotalCommentsAreas = (total: number) => {
  return createAction('setTotalCommentsAreas', { total });
};

export const setFetchingCommentsAreas = (fetching: boolean) => {
  return createAction('setFetchingCommentsAreas', { fetching });
};

export const setCommentsAreaIdentifier = (identifier: string, commentsArea: CommentsArea) => {
  return createAction('setCommentsAreaIdentifier', { identifier, commentsArea });
};

export const setCurrentCommentsArea = (commentsArea: CommentsArea) => {
  return createAction('setCurrentCommentsArea', { commentsAreaId: commentsArea.id });
};

export const setFetchingCommentsArea = (fetching: boolean) => {
  return createAction('setFetchingCommentsArea', { fetching });
};

export const setCommentsAreaNotFound = (notFound: boolean) => {
  return createAction('setCommentsAreaNotFound', { notFound });
};

export const setIsRequestingCommentsArea = (requesting: boolean) => {
  return createAction('setIsRequestingCommentsArea', { requesting });
};

export const setCommentsAreaRequested = (requested: boolean) => {
  return createAction('setCommentsAreaRequested', { requested });
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

export const setIsSubmittingRootComment = (isSubmitting: boolean) => {
  return createAction('setIsSubmittingRootComment', { isSubmitting });
};

export type CommentsAreaActions = ReturnType<
  | typeof setCommentsAreaIdentifier
  | typeof setCommentsAreas
  | typeof setTotalCommentsAreas
  | typeof setFetchingCommentsAreas
  | typeof setCommentsAreaNotFound
  | typeof setIsRequestingCommentsArea
  | typeof setCommentsAreaRequested
  | typeof setCurrentCommentsArea
  | typeof setFetchingCommentsArea
  | typeof setFetchingComments
  | typeof setCommentsPage
  | typeof setCommentsSort
  | typeof setCommentsSearchQuery
  | typeof setIsSubmittingRootComment
>;
