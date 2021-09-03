import { AppState, Reducer } from '../store';

export const commentsAreaReducer: Reducer<AppState['commentsArea']> = (state, action) => {
  if (action.type === 'setCurrentCommentsArea') {
    return { ...state, currentCommentsAreaId: action.payload.commentsAreaId };
  }

  if (action.type === 'setFetchingCommentsArea') {
    return { ...state, isFetchingCommentsArea: action.payload.fetching };
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
