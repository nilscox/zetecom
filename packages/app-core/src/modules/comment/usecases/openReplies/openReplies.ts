import { createThunk } from '../../../../store/createThunk';
import { setAreRepliesOpen } from '../../actions';
import { selectComment } from '../../selectors';
import { fetchReplies } from '../index';

export const openReplies = createThunk(async ({ getState, dispatch }, commentId: string) => {
  const { replies } = selectComment(getState(), commentId);

  dispatch(setAreRepliesOpen(commentId, true));

  if (replies.length === 0) {
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
