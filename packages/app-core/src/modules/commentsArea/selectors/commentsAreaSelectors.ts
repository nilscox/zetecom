import { selectCommentsArea } from '../../../store/normalize';
import { AppState } from '../../../store/store';

export { selectCommentsArea };

export const selectCurrentCommentsArea = (state: AppState) => {
  if (state.commentsArea.currentCommentsAreaId) {
    return selectCommentsArea(state, state.commentsArea.currentCommentsAreaId);
  }
};

export const selectIsFetchingCommentsArea = (state: AppState) => {
  return state.commentsArea.isFetchingCommentsArea;
};

export const selectIsFetchingComments = (state: AppState) => {
  return state.commentsArea.isFetchingComments;
};

export const selectIsSubmittingRootComment = (state: AppState) => {
  return state.commentsArea.isSubmittingRootComment;
};

export const selectCommentsPage = (state: AppState) => {
  return state.commentsArea.commentsPage;
};

export const selectCommentsPageSize = (state: AppState) => {
  return state.commentsArea.commentsPageSize;
};

export const selectCommentsPagesCount = (state: AppState) => {
  const currentCommentsArea = selectCurrentCommentsArea(state);
  const pageSize = selectCommentsPageSize(state);

  if (!currentCommentsArea) {
    return undefined;
  }

  return Math.floor(currentCommentsArea.commentsCount / pageSize);
};

export const selectCommentsSort = (state: AppState) => {
  return state.commentsArea.commentsSort;
};

export const selectCommentsSearchQuery = (state: AppState) => {
  return state.commentsArea.commentsSearchQuery;
};
