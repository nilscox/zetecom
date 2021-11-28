import { AppState } from '../../../store/AppState';
import { selectCommentsArea } from '../../../store/normalize';

export { selectCommentsArea };

export const selectCommentsAreas = (state: AppState) => {
  return state.commentsAreas.commentsAreasIds.map((id) => selectCommentsArea(state, id));
};

export const selectTotalCommentsAreas = (state: AppState) => {
  return state.commentsAreas.commentsAreasCount;
};

export const selectIsFetchingCommentsAreas = (state: AppState) => {
  return state.commentsAreas.isFetchingCommentsAreas;
};

export const selectCommentsAreasSearchQuery = (state: AppState) => {
  return state.commentsAreas.commentsAreasSearchQuery;
};

export const selectCommentsAreaByIdentifier = (state: AppState, identifier: string) => {
  return selectCommentsArea(state, state.commentsAreas.byIdentifier[identifier]);
};

export const selectCurrentCommentsArea = (state: AppState) => {
  if (state.commentsArea.currentCommentsAreaId) {
    return selectCommentsArea(state, state.commentsArea.currentCommentsAreaId);
  }
};

export const selectIsFetchingCommentsArea = (state: AppState) => {
  return state.commentsArea.isFetchingCommentsArea;
};

export const selectCommentsAreaNotFound = (state: AppState) => {
  return state.commentsArea.notFound;
};

export const selectIsRequestingCommentsArea = (state: AppState) => {
  return state.commentsArea.isRequesting;
};

export const selectCommentsAreaRequested = (state: AppState) => {
  return state.commentsArea.requested;
};

export const selectIsFetchingComments = (state: AppState) => {
  return state.commentsArea.isFetchingComments;
};

export const selectIsSubmittingRootComment = (state: AppState) => {
  return state.commentsArea.isSubmittingRootComment;
};

export const selectCommentsSort = (state: AppState) => {
  return state.commentsArea.commentsSort;
};

export const selectCommentsSearchQuery = (state: AppState) => {
  return state.commentsArea.commentsSearchQuery;
};
