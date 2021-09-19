import { createThunk } from '../../../store/createThunk';
import { fetchCommentsAreaByIdentifier } from '../../commentsArea';

export const loadIntegration = createThunk(async ({ dispatch, extensionGateway }, identifier: string) => {
  const commentsArea = await dispatch(fetchCommentsAreaByIdentifier(identifier));

  if (commentsArea) {
    extensionGateway.setExtensionActive(commentsArea.id, commentsArea.commentsCount);
  }
});
