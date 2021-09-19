import { AppState } from '../../AppState';
import { Reducer } from '../../types';

export const informationsEntitiesReducer: Reducer<AppState['entities']['informations']> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.informations };
  }

  return state;
};
