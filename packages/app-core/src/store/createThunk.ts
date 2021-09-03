import { Dependencies, Dispatch, GetState, ThunkAction } from './store';

export type ThunkParams = {
  dispatch: Dispatch;
  getState: GetState;
} & Dependencies;

export interface Thunk<Args extends unknown[], Return> {
  (params: ThunkParams, ...args: Args): Return;
}

export const createThunk = <Args extends unknown[], Return>(
  thunk: Thunk<Args, Return>,
): ((...args: Args) => ThunkAction<Return>) => {
  return (...args) => {
    return (dispatch, getState, deps) => {
      return thunk({ dispatch, getState, ...deps }, ...args);
    };
  };
};
