import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { rootReducer } from './reducers';
import { AppAction, AppState, Dependencies, Store } from './store';

type AppThunkMiddleware = ThunkMiddleware<AppState, AppAction, Dependencies>;

export const reduxStore = (deps: Dependencies): Store => {
  return createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(deps) as AppThunkMiddleware));
};
