import { ExtensionConfig, IntegrationType } from '../../../entities';
import { createThunk } from '../../../store/createThunk';
import { setExtensionConfig } from '../actions';

export const updateExtensionConfig = createThunk(
  async ({ dispatch, extensionGateway }, media: string, integration: IntegrationType) => {
    const extensionConfig = await extensionGateway.getExtensionConfig();

    const newConfig: ExtensionConfig = {
      mediaIntegrations: {
        ...extensionConfig.mediaIntegrations,
        [media]: integration,
      },
    };

    extensionGateway.setExtensionConfig(newConfig);
    dispatch(setExtensionConfig(newConfig));
  },
);
