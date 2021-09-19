import { AppState } from '../../AppState';
import { Reducer } from '../../types';

export const notificationsEntitiesReducer: Reducer<AppState['entities']['notifications']> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.notifications };
  }

  return state;
};
