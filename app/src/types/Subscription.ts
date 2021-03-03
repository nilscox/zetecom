import { Comment } from './Comment';

export type CommentSubscription = {
  id: number;
  created: string;
  comment: Comment;
};
