import { AppState } from '../../AppState';
import { Reducer } from '../../types';

export const commentsAreasEntitiesReducer: Reducer<AppState['entities']['commentsAreas']> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.commentsAreas };
  }

  return state;
};
