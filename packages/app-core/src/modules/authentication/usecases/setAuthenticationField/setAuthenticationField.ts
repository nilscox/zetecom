import { AuthenticationField } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import {
  setAuthenticationField as setAuthenticationFieldAction,
  setAuthenticationFieldError,
  setAuthenticationGlobalError,
} from '../../actions';
import { selectAuthenticationFieldError, selectAuthenticationGlobalError } from '../../selectors';

export const setAuthenticationField = createThunk(
  ({ dispatch, getState }, field: AuthenticationField, value: string) => {
    dispatch(setAuthenticationFieldAction(field, value));

    if (selectAuthenticationGlobalError(getState())) {
      dispatch(setAuthenticationGlobalError(undefined));
    }

    if (selectAuthenticationFieldError(getState(), field)) {
      dispatch(setAuthenticationFieldError(field, undefined));
    }
  },
);
