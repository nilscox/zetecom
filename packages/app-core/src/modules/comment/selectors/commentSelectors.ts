import { AppState } from '../../../store/AppState';
import { selectComment } from '../../../store/normalize';
import { selectAuthenticatedUser, selectIsAuthenticated } from '../../authentication';

export { selectComment } from '../../../store/normalize';

export const selectIsFetchingComment = (state: AppState) => {
  return state.comment.isFetchingComment;
};

export const selectIsReportingComment = (state: AppState): boolean => {
  return state.comment.isReportingComment;
};

export const selectIsCommentReported = (state: AppState): boolean => {
  return state.comment.isCommentReported;
};

export const selectCommentHistoryLink = (_state: AppState, commentId: string) => {
  return `/commentaire/${commentId}/historique`;
};

export const selectReportCommentLink = (_state: AppState, commentId: string) => {
  return `/commentaire/${commentId}/signaler`;
};

export const selectReplies = (state: AppState, commentId: string) => {
  return selectComment(state, commentId).replies;
};

export const selectIsAuthor = (state: AppState, commentId: string): boolean => {
  const comment = selectComment(state, commentId);
  const authenticatedUser = selectAuthenticatedUser(state);

  return comment.author.id === authenticatedUser?.id;
};

export const selectCanEdit = (state: AppState, commentId: string): boolean => {
  return selectIsAuthor(state, commentId);
};

export const selectCanReply = (state: AppState, _commentId: string): boolean => {
  return selectIsAuthenticated(state);
};

export const selectCanSetReaction = (state: AppState, commentId: string): boolean => {
  const isAuthenticated = selectIsAuthenticated(state);
  const isAuthor = selectIsAuthor(state, commentId);

  return isAuthenticated && !isAuthor;
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
  return selectIsAuthenticated(state);
};

export const selectCanViewHistory = (state: AppState, commentId: string): boolean => {
  const comment = selectComment(state, commentId);

  return comment.edited !== false;
};

export const selectCanReport = (state: AppState, commentId: string): boolean => {
  const isAuthenticated = selectIsAuthenticated(state);
  const isAuthor = selectIsAuthor(state, commentId);

  return isAuthenticated && !isAuthor;
};
