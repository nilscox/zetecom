import { AuthenticatedUser, createAuthenticatedUser, User } from '../entities';
// eslint-disable-next-line import/no-internal-modules
import { selectAuthenticatedUser } from '../modules/authentication';
// eslint-disable-next-line import/no-internal-modules
import { setAuthenticatedUser, unsetAuthenticatedUser } from '../modules/authentication/actions';
import {
  FakeDateGateway,
  FakeTimerGateway,
  MockCommentGateway,
  MockCommentsAreaGateway,
  MockDependencies,
  MockExtensionGateway,
  MockNotificationGateway,
  MockRouterGateway,
  MockUserGateway,
} from '../shared/mocks';

import { setUser } from './normalize';
import { initialState, rootReducer } from './reducers';
import { testLoadingStateFactory } from './testLoadingState';
import { testStateFactory } from './testState';
import { AppAction, Dispatch, GetState, Selector, Store, ThunkAction } from './types';

export class MemoryStore implements Store {
  private state = initialState;

  readonly dependencies: MockDependencies = {
    commentsAreaGateway: new MockCommentsAreaGateway(),
    commentGateway: new MockCommentGateway(),
    userGateway: new MockUserGateway(),
    routerGateway: new MockRouterGateway(),
    extensionGateway: new MockExtensionGateway(),
    dateGateway: new FakeDateGateway(),
    timerGateway: new FakeTimerGateway(),
    notificationGateway: new MockNotificationGateway(),
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

  select<R, A extends unknown[]>(selector: Selector<R, A>, ...args: A) {
    return selector(this.getState(), ...args);
  }

  testState = testStateFactory(this);
  testLoadingState = testLoadingStateFactory(this);

  get user(): AuthenticatedUser | undefined {
    return this.select(selectAuthenticatedUser);
  }

  set user(user: AuthenticatedUser | User | undefined) {
    if (user) {
      this.dispatch(setUser(user));
      this.dispatch(
        setAuthenticatedUser({
          ...createAuthenticatedUser(),
          ...user,
        }),
      );
    } else {
      this.dispatch(unsetAuthenticatedUser());
    }
  }
}
