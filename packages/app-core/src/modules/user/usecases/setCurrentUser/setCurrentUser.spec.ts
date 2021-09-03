import { expect } from 'earljs';

import { createUser } from '../../../../entities/User';
import { createMemoryStore } from '../../../../store/memoryStore';
import { setUser } from '../../../../store/normalize';
import { Dispatch, GetState } from '../../../../store/store';
import { selectCurrentUser } from '../../selectors/userSelectors';
import { setCurrentUser as setCurrentUserAction } from '../../userActions';

import { setCurrentUser } from './setCurrentUser';

describe('setCurrentUser', () => {
  let dispatch: Dispatch;
  let getState: GetState;

  beforeEach(() => {
    ({ dispatch, getState } = createMemoryStore());
  });

  it('sets the current user', () => {
    const user = createUser();

    dispatch(setCurrentUser(user));

    expect(selectCurrentUser(getState())).toEqual(user);
  });

  it('unsets the current user', () => {
    const user = createUser();

    dispatch(setUser(user));
    dispatch(setCurrentUserAction(user));

    dispatch(setCurrentUser(undefined));

    expect(selectCurrentUser(getState())).toEqual(undefined);
  });
});
