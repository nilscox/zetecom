import { createThunk } from '../../../../store/createThunk';
import { setCommentsAreaRequested, setIsRequestingCommentsArea } from '../../actions';

export const requestCommentsArea = createThunk(
  async ({ dispatch, commentsAreaGateway }, identifier: string, pageUrl: string) => {
    try {
      dispatch(setIsRequestingCommentsArea(true));

      await commentsAreaGateway.requestCommentsArea(identifier, pageUrl);

      dispatch(setCommentsAreaRequested(true));
    } finally {
      dispatch(setIsRequestingCommentsArea(false));
    }
  },
);
