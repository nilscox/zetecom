import { createThunk } from '../../../store/createThunk';
import { fetchCommentsAreaByIdentifier } from '../../commentsArea';

export const loadIntegration = createThunk(
  async ({ dispatch, extensionGateway, trackingGateway }, identifier: string) => {
    const commentsArea = await dispatch(fetchCommentsAreaByIdentifier(identifier));

    if (!commentsArea) {
      return;
    }

    extensionGateway.setExtensionActive(commentsArea.id, commentsArea.commentsCount);

    trackingGateway.track({
      category: 'extension',
      action: 'view integration',
      name: `view integration ${identifier}`,
    });
  },
);
