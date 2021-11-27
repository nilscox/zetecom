import { createThunk } from '../../../../store/createThunk';
import { setIsAuthenticating } from '../../actions';
import { setAuthenticatedUser } from '../index';

export const logout = createThunk(
  async ({ dispatch, userGateway, routerGateway, trackingGateway }, location: 'app' | 'popup') => {
    try {
      dispatch(setIsAuthenticating(true));

      await userGateway.logout();

      dispatch(setAuthenticatedUser(undefined));

      trackingGateway.track({
        category: 'authentication',
        action: 'logout',
        name: `logout from ${location}`,
      });

      if (location === 'app') {
        routerGateway.push('/connexion');
      } else {
        routerGateway.push('/popup/connexion');
      }
    } catch (error) {
      console.error(error);
      // TODO: error handling
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  },
);
