import { AppState } from '../../../store/AppState';

import { selectCurrentCommentsArea } from './commentsAreaSelectors';

export const selectCommentsPage = (state: AppState) => {
  return state.commentsArea.commentsPage;
};

export const selectCommentsPageSize = (state: AppState) => {
  return state.commentsArea.commentsPageSize;
};

export const selectCommentsPagesCount = (state: AppState) => {
  const commentsArea = selectCurrentCommentsArea(state);

  if (!commentsArea) {
    return undefined;
  }

  const { commentsCount } = commentsArea;
  const pageSize = selectCommentsPageSize(state);

  return Math.max(1, Math.ceil(commentsCount / pageSize));
};

export const selectCanNavigateToPreviousCommentsPages = (state: AppState) => {
  return selectCommentsPage(state) !== 1;
};

export const selectCanNavigateToNextCommentsPages = (state: AppState) => {
  const pagesCount = selectCommentsPagesCount(state);

  return Boolean(pagesCount) && selectCommentsPage(state) !== pagesCount;
};
