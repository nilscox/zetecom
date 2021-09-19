import { createThunk } from '../../../../store/createThunk';
import { setIsCommentReported, setIsReportingComment } from '../../actions';

const CLOSE_POPUP_TIMEOUT = 4200;

export const reportComment = createThunk(
  async ({ dispatch, commentGateway, timerGateway, routerGateway }, commentId: string, message?: string) => {
    try {
      dispatch(setIsReportingComment(true));

      await commentGateway.reportComment(commentId, message);

      dispatch(setIsCommentReported(true));

      timerGateway.setTimeout(() => routerGateway.closePopup(), CLOSE_POPUP_TIMEOUT);
    } finally {
      dispatch(setIsReportingComment(false));
    }
  },
);
