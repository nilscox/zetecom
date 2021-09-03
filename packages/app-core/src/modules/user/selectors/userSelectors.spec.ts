import { expect } from 'earljs';

import { createUser } from '../../../entities/User';
import { createMemoryStore } from '../../../store/memoryStore';
import { setUser } from '../../../store/normalize';
import { Dispatch, GetState } from '../../../store/store';
import { setCurrentUser } from '../userActions';

import { selectCurrentUser, selectIsLoggedIn } from './userSelectors';

describe('userSelectors', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  beforeEach(() => {
    ({ dispatch, getState } = createMemoryStore());
  });

  it('selectCurrentUser', () => {
    expect(selectCurrentUser(getState())).toEqual(undefined);

    const user = createUser();

    dispatch(setUser(user));
    dispatch(setCurrentUser(user));

    expect(selectCurrentUser(getState())).toEqual(user);
  });

  it('selectIsLoggedIn', () => {
    expect(selectIsLoggedIn(getState())).toEqual(false);

    const user = createUser();

    dispatch(setUser(user));
    dispatch(setCurrentUser(user));

    expect(selectIsLoggedIn(getState())).toEqual(true);
  });
});
