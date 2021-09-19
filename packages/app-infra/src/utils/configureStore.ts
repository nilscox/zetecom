import { Dependencies, rootReducer } from '@zetecom/app-core';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const configureStore = (deps: Partial<Dependencies>) => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(deps))));
};
