import { renderHook } from '@testing-library/react-hooks';
import { createAuthenticatedUser, selectAuthenticatedUser, setAuthenticatedUser, Store } from '@zetecom/app-core';
import { MockUserGateway } from '@zetecom/app-core/shared/mocks';
import { selectUser } from '@zetecom/app-core/store/normalize';
import { expect } from 'earljs';

import { Test } from '~/Test';
import { configureStore } from '~/utils/configureStore';

import { useAppSelector } from './useAppSelector';

describe('useAppSelector', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({ userGateway: new MockUserGateway() });
  });

  it('selects some part of the store with a selector', () => {
    const user = createAuthenticatedUser();

    store.dispatch(setAuthenticatedUser(user));

    const { result } = renderHook(() => useAppSelector(selectAuthenticatedUser), {
      wrapper: ({ children }) => <Test store={store}>{children}</Test>,
    });

    expect(result.current).toEqual(user);
  });

  it('selects some part of the store with a selector with parameters', () => {
    const user = createAuthenticatedUser();

    store.dispatch(setAuthenticatedUser(user));

    const { result } = renderHook(() => useAppSelector(selectUser, user.id), {
      wrapper: ({ children }) => <Test store={store}>{children}</Test>,
    });

    expect(result.current).toEqual(user);
  });
});
