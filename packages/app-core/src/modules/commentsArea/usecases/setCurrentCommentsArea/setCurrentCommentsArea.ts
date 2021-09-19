import { CommentsArea } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setCommentsArea } from '../../../../store/normalize';
import { setCurrentCommentsArea as setCurrentCommentsAreaAction } from '../../actions';

export const setCurrentCommentsArea = createThunk(({ dispatch }, commentsArea: CommentsArea) => {
  dispatch(setCommentsArea(commentsArea));
  dispatch(setCurrentCommentsAreaAction(commentsArea));
});
