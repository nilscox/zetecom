import { api } from './api';

export const getComment = (commentId: number) => {
  return api(`/api/comment/${commentId}`);
};

export const getCommentHistory = (commentId: number) => {
  return api(`/api/comment/${commentId}/history`);
};

export const createComment = (commentsAreaId: number, text: string) => {
  return api('/api/comment', {
    method: 'POST',
    body: {
      text,
      commentsAreaId,
    },
  });
};
