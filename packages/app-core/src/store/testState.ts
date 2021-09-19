import { expect } from 'earljs';

import { AppAction, Selector, Store, ThunkAction } from './types';

interface TestStateExpect<R> {
  expect(params: Partial<{ before: R; after: R; action: AppAction | ThunkAction<unknown> }>): TestStateExpect<R>;
}

export interface TestState {
  <R, A extends unknown[]>(selector: Selector<R, A>, ...args: A): TestStateExpect<R>;
}

const testStateExpect = <R, A extends unknown[]>(
  { getState, dispatch }: Store,
  selector: Selector<R, A>,
  args: A,
): TestStateExpect<R> => ({
  expect(params: Partial<{ before: R; after: R; action: AppAction | ThunkAction<unknown> }>) {
    if ('before' in params) {
      expect(selector(getState(), ...args), { extraMessage: 'testState.before' }).toEqual(params.before!);
    }

    if ('action' in params) {
      dispatch(params.action as AppAction);
    }

    if ('after' in params) {
      expect(selector(getState(), ...args), { extraMessage: 'testState.after' }).toEqual(params.after!);
    }

    return this;
  },
});

export const testStateFactory = (store: Store): TestState => {
  return <R, A extends unknown[]>(selector: Selector<R, A>, ...args: A) => {
    return testStateExpect(store, selector, args);
  };
};
