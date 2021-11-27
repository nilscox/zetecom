import { createThunk } from '../../../../store/createThunk';
import { setIsAuthenticating, unsetAuthenticatedUser } from '../../actions';

export const logout = createThunk(
  async ({ dispatch, userGateway, routerGateway, trackingGateway }, location: 'app' | 'popup') => {
    try {
      dispatch(setIsAuthenticating(true));

      await userGateway.logout();

      dispatch(unsetAuthenticatedUser());

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
