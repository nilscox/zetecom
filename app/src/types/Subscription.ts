import { Type } from 'class-transformer';

import { Comment } from './Comment';

export class CommentSubscription {
  id: number;

  @Type(() => Date)
  created: Date;

  @Type(() => Comment)
  comment: Comment;
}
