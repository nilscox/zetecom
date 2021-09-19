import { createAction } from '../../../store/createAction';

export const setFetchingComment = (fetching: boolean) => {
  return createAction('setIsFetchingComment', { fetching });
};

export const setIsReportingComment = (reporting: boolean) => {
  return createAction('setIsReportingComment', { reporting });
};

export const setIsCommentReported = (reported: boolean) => {
  return createAction('setIsCommentReported', { reported });
};

export const setAreRepliesOpen = (commentId: string, repliesOpen: boolean) => {
  return createAction('setAreRepliesOpen', { commentId, repliesOpen });
};

export const setIsEditing = (commentId: string, isEditing: boolean) => {
  return createAction('setIsEditing', { commentId, isEditing });
};

export const setIsSubmittingEdition = (commentId: string, isSubmittingEdition: boolean) => {
  return createAction('setIsSubmittingEdition', { commentId, isSubmittingEdition });
};

export const setIsFetchingReplies = (commentId: string, isFetchingReplies: boolean) => {
  return createAction('setIsFetchingReplies', { commentId, isFetchingReplies });
};

export const setIsReplyFormOpen = (commentId: string, iReplyFormOpen: boolean) => {
  return createAction('setIsReplyFormOpen', { commentId, iReplyFormOpen });
};

export const setIsSubmittingReply = (commentId: string, iSubmittingReply: boolean) => {
  return createAction('setIsSubmittingReply', { commentId, iSubmittingReply });
};

export type CommentActions = ReturnType<
  | typeof setFetchingComment
  | typeof setIsReportingComment
  | typeof setIsCommentReported
  | typeof setAreRepliesOpen
  | typeof setIsEditing
  | typeof setIsSubmittingEdition
  | typeof setIsFetchingReplies
  | typeof setIsReplyFormOpen
  | typeof setIsSubmittingReply
>;
