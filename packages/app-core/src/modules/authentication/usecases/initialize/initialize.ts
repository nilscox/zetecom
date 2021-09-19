import { createThunk } from '../../../../store/createThunk';
import { setIsFetchingAuthenticatedUser } from '../../actions';
import { setAuthenticatedUser } from '../index';

export const initialize = createThunk(async ({ dispatch, userGateway }) => {
  try {
    dispatch(setIsFetchingAuthenticatedUser(true));

    const userDto = await userGateway.fetchAuthenticatedUser();

    if (userDto) {
      await dispatch(setAuthenticatedUser(userDto));
    }
  } finally {
    dispatch(setIsFetchingAuthenticatedUser(false));
  }
});
