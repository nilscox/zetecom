import { AuthenticationField } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { selectAuthenticationFieldError, selectAuthenticationGlobalError } from '../..';
import { setAuthenticationFieldError, setAuthenticationGlobalError } from '../../actions';

export const clearAuthenticationErrors = createThunk(({ dispatch, getState }) => {
  const state = getState();

  for (const field of Object.values(AuthenticationField)) {
    if (selectAuthenticationFieldError(state, field) !== undefined) {
      dispatch(setAuthenticationFieldError(field, undefined));
    }
  }

  if (selectAuthenticationGlobalError(state) !== undefined) {
    dispatch(setAuthenticationGlobalError(undefined));
  }
});
