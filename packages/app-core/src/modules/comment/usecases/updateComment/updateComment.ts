import { Comment } from '../../../../entities/Comment';
import { createThunk } from '../../../../store/createThunk';
import { selectComment, setComment } from '../../../../store/normalize';

export const updateComment = createThunk(({ getState, dispatch }, commentId: string, updates: Partial<Comment>) => {
  dispatch(setComment({ ...selectComment(getState(), commentId), ...updates }));
});
