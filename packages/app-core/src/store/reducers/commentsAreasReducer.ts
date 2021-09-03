import { AppState, Reducer } from '../store';

export const commentsAreasReducer: Reducer<AppState['entities']['commentsAreas']> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.commentsAreas };
  }

  return state;
};
