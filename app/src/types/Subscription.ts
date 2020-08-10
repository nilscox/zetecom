import { Comment, parseComment } from './Comment';

export type CommentSubscription = {
  id: number;
  created: Date;
  comment: Comment;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCommentSubscription = (data: any): CommentSubscription => {
  return {
    ...data,
    date: new Date(data.date),
    comment: parseComment(data.comment),
  };
};
