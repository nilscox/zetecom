import { AppState, Reducer } from '../store';

export const informationsReducer: Reducer<AppState['entities']['informations']> = (state, action) => {
  if (action.type === 'setEntities') {
    return { ...state, ...action.payload.informations };
  }

  return state;
};
