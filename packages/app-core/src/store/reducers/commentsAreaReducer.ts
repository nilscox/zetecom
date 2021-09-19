import { AppState } from '../AppState';
import { Reducer } from '../types';

export const commentsAreaReducer: Reducer<AppState['commentsArea']> = (state, action): AppState['commentsArea'] => {
  if (action.type === 'setCurrentCommentsArea') {
    return { ...state, currentCommentsAreaId: action.payload.commentsAreaId };
  }

  if (action.type === 'setFetchingCommentsArea') {
    return { ...state, isFetchingCommentsArea: action.payload.fetching };
  }

  if (action.type === 'setCommentsAreaNotFound') {
    return { ...state, notFound: action.payload.notFound };
  }

  if (action.type === 'setIsRequestingCommentsArea') {
    return { ...state, isRequesting: action.payload.requesting };
  }

  if (action.type === 'setCommentsAreaRequested') {
    return { ...state, requested: action.payload.requested };
  }

  if (action.type === 'setFetchingComments') {
    return { ...state, isFetchingComments: action.payload.fetching };
  }

  if (action.type === 'setIsSubmittingRootComment') {
    return { ...state, isSubmittingRootComment: action.payload.isSubmitting };
  }

  if (action.type === 'setCommentsPage') {
    return { ...state, commentsPage: action.payload.page };
  }

  if (action.type === 'setCommentsSort') {
    return { ...state, commentsSort: action.payload.sort };
  }

  if (action.type === 'setCommentsSearchQuery') {
    return { ...state, commentsSearchQuery: action.payload.searchQuery };
  }

  return state;
};
