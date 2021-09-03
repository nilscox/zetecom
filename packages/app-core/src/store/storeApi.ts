export interface Store<State, Action, Dependencies> {
  getState(): State;

  dispatch(action: Action): void;
  dispatch<Return>(thunk: ThunkAction<Return, State, Action, Dependencies>): Return;
}

export type ThunkAction<Return, State, Action, Dependencies> = (
  dispatch: Dispatch<State, Action, Dependencies>,
  getState: GetState<State>,
  deps: Dependencies,
) => Return;

type GetState<State> = Store<State, unknown, unknown>['getState'];
type Dispatch<State, Action, Dependencies> = Store<State, Action, Dependencies>['dispatch'];
