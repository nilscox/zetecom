import { selectComment } from '../../../store/normalize';
import { AppState } from '../../../store/store';
import { selectCurrentUser, selectIsLoggedIn } from '../../user/selectors/userSelectors';

export { selectComment } from '../../../store/normalize';

export const selectReportCommentLink = (_state: AppState, commentId: string) => {
  return `/commentaire/${commentId}/signaler`;
};

export const selectReplies = (state: AppState, commentId: string) => {
  return selectComment(state, commentId).replies;
};

export const selectIsAuthor = (state: AppState, commentId: string): boolean => {
  const comment = selectComment(state, commentId);
  const currentUser = selectCurrentUser(state);

  return comment.author.id === currentUser?.id;
};

export const selectCanEdit = (state: AppState, commentId: string): boolean => {
  return selectIsAuthor(state, commentId);
};

export const selectCanReply = (state: AppState, _commentId: string): boolean => {
  return selectIsLoggedIn(state);
};

export const selectCanSetReaction = (state: AppState, commentId: string): boolean => {
  const isLoggedIn = selectIsLoggedIn(state);
  const isAuthor = selectIsAuthor(state, commentId);

  return isLoggedIn && !isAuthor;
};

export const selectCanToggleReplies = (state: AppState, commentId: string): boolean => {
  const comment = selectComment(state, commentId);

  return comment.repliesCount > 0 && !comment.isReplyFormOpen;
};

export const selectCanToggleReplyForm = (state: AppState, commentId: string): boolean => {
  const comment = selectComment(state, commentId);

  return !comment.isReplyFormOpen;
};

export const selectCanSubscribe = (state: AppState, _commentId: string): boolean => {
  return selectIsLoggedIn(state);
};

export const selectCanReport = (state: AppState, commentId: string): boolean => {
  const isLoggedIn = selectIsLoggedIn(state);
  const isAuthor = selectIsAuthor(state, commentId);

  return isLoggedIn && !isAuthor;
};
