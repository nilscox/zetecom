import { createThunk } from '../../../store/createThunk';

export const focusIntegration = createThunk(async ({ extensionGateway }) => {
  extensionGateway.focusApp();
});
