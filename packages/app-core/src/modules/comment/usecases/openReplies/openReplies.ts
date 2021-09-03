import { createThunk } from '../../../../store/createThunk';
import { setAreRepliesOpen } from '../../commentActions';
import { selectComment } from '../../selectors/commentSelectors';
import { fetchReplies } from '../fetchReplies/fetchReplies';

export const openReplies = createThunk(async ({ getState, dispatch }, commentId: string) => {
  const { replies, repliesCount } = selectComment(getState(), commentId);

  dispatch(setAreRepliesOpen(commentId, true));

  if (replies.length < repliesCount) {
    await dispatch(fetchReplies(commentId));
  }
});

export const closeReplies = createThunk(({ dispatch }, commentId: string) => {
  dispatch(setAreRepliesOpen(commentId, false));
});

export const toggleReplies = createThunk(async ({ getState, dispatch }, commentId: string) => {
  const { areRepliesOpen } = selectComment(getState(), commentId);

  if (!areRepliesOpen) {
    await dispatch(openReplies(commentId));
  } else {
    dispatch(closeReplies(commentId));
  }
});
