import { FakeTimerGateway, MockCommentGateway, MockDependencies, MockRouterGateway } from '../shared/mocks';

import { initalState, rootReducer } from './reducers';
import { AppAction, Dispatch, GetState, Store, ThunkAction } from './store';

class MemoryStore implements Store {
  private state = initalState;

  readonly dependencies: MockDependencies = {
    commentGateway: new MockCommentGateway(),
    routerGateway: new MockRouterGateway(),
    timerGateway: new FakeTimerGateway(),
  };

  getState: GetState = () => {
    return Object.freeze(this.state);
  };

  dispatch: Dispatch = <Return>(action: AppAction | ThunkAction<Return>): Return | undefined => {
    if (typeof action === 'function') {
      return action(this.dispatch, this.getState, this.dependencies);
    } else {
      this.state = rootReducer(this.state, action);
    }
  };
}

export const createMemoryStore = () => {
  const { dependencies, ...store } = new MemoryStore();

  return {
    ...store,
    ...dependencies,
  };
};
