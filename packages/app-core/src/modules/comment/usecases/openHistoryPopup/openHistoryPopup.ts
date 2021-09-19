import { createThunk } from '../../../../store/createThunk';
import { selectCommentHistoryLink } from '../../selectors';

export const openHistoryPopup = createThunk(({ getState, routerGateway }, commentId: string) => {
  const link = selectCommentHistoryLink(getState(), commentId);

  routerGateway.openPopup(link);
});
