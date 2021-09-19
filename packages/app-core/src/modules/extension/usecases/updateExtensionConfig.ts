import { IntegrationType } from '../../../entities';
import { createThunk } from '../../../store/createThunk';

export const updateExtensionConfig = createThunk(
  async ({ extensionGateway }, media: string, integration: IntegrationType) => {
    const extensionConfig = await extensionGateway.getExtensionConfig();

    extensionGateway.setExtensionConfig({
      mediaIntegrations: {
        ...extensionConfig.mediaIntegrations,
        [media]: integration,
      },
    });
  },
);
