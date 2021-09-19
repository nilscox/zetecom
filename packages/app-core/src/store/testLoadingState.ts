import { expect } from 'earljs';

import { Selector, Store, ThunkAction } from './types';

export interface TestLoadingState {
  <A extends unknown[]>(
    thunk: ThunkAction<Promise<unknown>>,
    selector: Selector<boolean, A>,
    ...args: A
  ): Promise<void>;
}

export const testLoadingStateFactory = (store: Store): TestLoadingState => {
  return async <A extends unknown[]>(
    thunk: ThunkAction<Promise<unknown>>,
    selector: Selector<boolean, A>,
    ...args: A
  ) => {
    expect(selector(store.getState(), ...args)).toEqual(false);

    const promise = store.dispatch(thunk);

    expect(selector(store.getState(), ...args)).toEqual(true);

    await promise;

    expect(selector(store.getState(), ...args)).toEqual(false);
  };
};
