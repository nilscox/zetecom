import { createThunk } from '../../../../store/createThunk';
import { unsetAuthenticatedUser } from '../../actions';

export const logout = createThunk(async ({ dispatch, userGateway, routerGateway }) => {
  await userGateway.logout();

  dispatch(unsetAuthenticatedUser());
  routerGateway.push('/connexion');
});
