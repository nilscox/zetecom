import { CommentsArea } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { selectCommentsArea, setCommentsArea } from '../../../../store/normalize';

export const updateCommentsArea = createThunk(
  ({ getState, dispatch }, commentsAreaId: string, updates: Partial<CommentsArea>) => {
    dispatch(setCommentsArea({ ...selectCommentsArea(getState(), commentsAreaId), ...updates }));
  },
);
