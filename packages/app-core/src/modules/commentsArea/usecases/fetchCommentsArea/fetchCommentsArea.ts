import { createThunk } from '../../../../store/createThunk';
import { setCommentsArea } from '../../../../store/normalize';
import { setCurrentCommentsArea, setFetchingCommentsArea } from '../../commentsAreaActions';
import { fetchComments } from '../fetchComments/fetchComments';

export const fetchCommentsArea = createThunk(async ({ dispatch, commentGateway }, commentsAreaId: string) => {
  dispatch(setFetchingCommentsArea(true));

  const commentsArea = await commentGateway.fetchCommentsArea(commentsAreaId);

  dispatch(setCommentsArea(commentsArea));
  dispatch(setCurrentCommentsArea(commentsArea.id));

  dispatch(fetchComments());

  dispatch(setFetchingCommentsArea(false));
});
