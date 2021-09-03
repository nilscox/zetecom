import { User } from '../../../entities/User';
import { selectUser } from '../../../store/normalize';
import { AppState } from '../../../store/store';

export const selectCurrentUser = (state: AppState): User | undefined => {
  if (!state.userId) {
    return;
  }

  return selectUser(state, state.userId);
};

export const selectIsLoggedIn = (state: AppState): boolean => {
  return selectCurrentUser(state) !== undefined;
};
