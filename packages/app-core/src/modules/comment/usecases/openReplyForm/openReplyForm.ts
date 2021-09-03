import { createThunk } from '../../../../store/createThunk';
import { setIsReplyFormOpen } from '../../commentActions';
import { selectComment } from '../../selectors/commentSelectors';
import { openReplies } from '../openReplies/openReplies';

export const openReplyForm = createThunk(async ({ getState, dispatch }, commentId: string) => {
  const comment = selectComment(getState(), commentId);

  dispatch(setIsReplyFormOpen(commentId, true));

  if (!comment.areRepliesOpen) {
    await dispatch(openReplies(comment.id));
  }
});

export const closeReplyForm = createThunk(({ dispatch }, commentId: string) => {
  dispatch(setIsReplyFormOpen(commentId, false));
});

export const toggleReplyForm = createThunk(async ({ getState, dispatch }, commentId: string) => {
  const comment = selectComment(getState(), commentId);

  if (comment.isReplyFormOpen) {
    dispatch(closeReplyForm(commentId));
  } else {
    await dispatch(openReplyForm(commentId));
  }
});
