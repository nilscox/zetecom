import { createThunk } from '../../../../store/createThunk';
import { selectReportCommentLink } from '../../selectors/commentSelectors';

export const openReportPopup = createThunk(({ getState, routerGateway }, commentId: string) => {
  const link = selectReportCommentLink(getState(), commentId);

  routerGateway.openPopup(link);
});
