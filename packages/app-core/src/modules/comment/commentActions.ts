import { createAction } from '../../store/createAction';

export const setIsSubmittingRootComment = (isSubmitting: boolean) => {
  return createAction('setIsSubmittingRootComment', { isSubmitting });
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
  | typeof setIsSubmittingRootComment
  | typeof setAreRepliesOpen
  | typeof setIsEditing
  | typeof setIsSubmittingEdition
  | typeof setIsFetchingReplies
  | typeof setIsReplyFormOpen
  | typeof setIsSubmittingReply
>;
