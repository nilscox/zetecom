import { createThunk } from '../../../../store/createThunk';
import { unsetAuthenticatedUser } from '../../actions';

export const logout = createThunk(
  async ({ dispatch, userGateway, routerGateway, trackingGateway }, location: 'app' | 'popup') => {
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
  },
);
