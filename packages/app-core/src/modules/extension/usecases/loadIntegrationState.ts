import { createThunk } from '../../../store/createThunk';
import { setIntegrationState } from '../actions';

export const loadIntegrationState = createThunk(async ({ dispatch, extensionGateway }) => {
  const integrationState = await extensionGateway.getIntegrationState();

  dispatch(setIntegrationState(integrationState));
});
