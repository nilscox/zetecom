import { createThunk } from '../../../store/createThunk';
import { setExtensionConfig } from '../actions';

export const loadExtensionConfig = createThunk(async ({ dispatch, extensionGateway }) => {
  const extensionConfig = await extensionGateway.getExtensionConfig();

  dispatch(setExtensionConfig(extensionConfig));
});
