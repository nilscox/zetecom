import { AppState } from '../AppState';
import { Reducer } from '../types';

export const commentReducer: Reducer<AppState['comment']> = (state, action): AppState['comment'] => {
  if (action.type === 'setIsFetchingComment') {
    return { ...state, isFetchingComment: action.payload.fetching };
  }

  if (action.type === 'setIsReportingComment') {
    return { ...state, isReportingComment: action.payload.reporting };
  }

  if (action.type === 'setIsCommentReported') {
    return { ...state, isCommentReported: action.payload.reported };
  }

  return state;
};
