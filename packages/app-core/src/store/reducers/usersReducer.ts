import { AppState, Reducer } from '../store';

export const usersReducer: Reducer<AppState['entities']['users']> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.users };
  }

  return state;
};
