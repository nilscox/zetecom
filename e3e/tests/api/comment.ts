import { api } from './api';

export const getComment = (commentId: number) => {
  return api(`/api/comment/${commentId}`);
};

export const getCommentHistory = (commentId: number) => {
  return api(`/api/comment/${commentId}/history`);
};

export const createComment = (commentsAreaId: number, parentId: number | null, text: string) => {
  return api('/api/comment', {
    method: 'POST',
    body: {
      text,
      commentsAreaId,
      parentId,
    },
  });
};

export const subscribe = (commentId: number) => {
  return api(`/api/comment/${commentId}/subscribe`, {
    method: 'POST',
  });
};

export const getReports = () => {
  return api(`/api/moderation/reports`);
};
