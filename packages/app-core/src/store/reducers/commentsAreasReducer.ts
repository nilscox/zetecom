import { AppState } from '../AppState';
import { Reducer } from '../types';

export const commentsAreasReducer: Reducer<AppState['commentsAreas']> = (state, action): AppState['commentsAreas'] => {
  if (action.type === 'setCommentsAreaIdentifier') {
    return {
      ...state,
      byIdentifier: {
        ...state.byIdentifier,
        [action.payload.identifier]: action.payload.commentsArea.id,
      },
    };
  }

  if (action.type === 'setCommentsAreas') {
    return { ...state, commentsAreasIds: action.payload.commentsAreasIds };
  }

  if (action.type === 'setTotalCommentsAreas') {
    return { ...state, commentsAreasCount: action.payload.total };
  }

  if (action.type === 'setFetchingCommentsAreas') {
    return { ...state, isFetchingCommentsAreas: action.payload.fetching };
  }

  return state;
};
