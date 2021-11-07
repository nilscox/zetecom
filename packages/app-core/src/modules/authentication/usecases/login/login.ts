import { AuthenticationError } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
// eslint-disable-next-line import/no-internal-modules
import { setAuthenticationGlobalError, setIsAuthenticating } from '../../actions';
import { selectAuthenticatedUser } from '../../selectors';
import { handleAuthenticationError, setAuthenticatedUser } from '../index';

export const login = createThunk(
  async (
    { getState, dispatch, userGateway, routerGateway, trackingGateway },
    email: string,
    password: string,
    location: 'app' | 'popup',
  ) => {
    if (selectAuthenticatedUser(getState())) {
      return dispatch(setAuthenticationGlobalError('Vous êtes déjà connecté.e.'));
    }

    try {
      dispatch(setIsAuthenticating(true));

      const userDto = await userGateway.login(email, password);

      await dispatch(setAuthenticatedUser(userDto));

      trackingGateway.track({
        category: 'authentication',
        action: 'login',
        name: `login from ${location}`,
      });

      if (location === 'popup') {
        routerGateway.push('/popup/compte');
      } else {
        routerGateway.push('/');
      }
    } catch (error) {
      dispatch(handleAuthenticationError(error));

      if (error instanceof AuthenticationError && error.body.message === 'INVALID_CREDENTIALS') {
        trackingGateway.track({
          category: 'authentication',
          action: 'login failed',
          name: `login failed from ${location}`,
        });
      }
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  },
);
