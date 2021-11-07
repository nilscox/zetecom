import { createThunk } from '../../../../store/createThunk';
import { setCommentsAreaRequested, setIsRequestingCommentsArea } from '../../actions';

export const requestCommentsArea = createThunk(
  async ({ dispatch, commentsAreaGateway, trackingGateway }, identifier: string, pageUrl: string) => {
    try {
      dispatch(setIsRequestingCommentsArea(true));

      await commentsAreaGateway.requestCommentsArea(identifier, pageUrl);

      dispatch(setCommentsAreaRequested(true));

      trackingGateway.track({
        category: 'comments-area',
        action: 'comments area requested',
      });
    } finally {
      dispatch(setIsRequestingCommentsArea(false));
    }
  },
);
