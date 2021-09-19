import { createThunk } from '../../../../store/createThunk';
// eslint-disable-next-line import/no-internal-modules
import { setAuthenticationGlobalError, setIsAuthenticating } from '../../actions';
import { selectAuthenticatedUser } from '../../selectors';
import { handleAuthenticationError, setAuthenticatedUser } from '../index';

export const login = createThunk(
  async ({ getState, dispatch, userGateway, routerGateway }, email: string, password: string) => {
    if (selectAuthenticatedUser(getState())) {
      return dispatch(setAuthenticationGlobalError('Vous êtes déjà connecté.e.'));
    }

    try {
      dispatch(setIsAuthenticating(true));

      const userDto = await userGateway.login(email, password);

      await dispatch(setAuthenticatedUser(userDto));

      routerGateway.push('/');
    } catch (error) {
      dispatch(handleAuthenticationError(error));
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  },
);
