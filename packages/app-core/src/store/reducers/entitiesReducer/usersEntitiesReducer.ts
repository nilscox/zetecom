import { AppState } from '../../AppState';
import { Reducer } from '../../types';

export const usersEntitiesReducer: Reducer<AppState['entities']['users']> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.users };
  }

  return state;
};
