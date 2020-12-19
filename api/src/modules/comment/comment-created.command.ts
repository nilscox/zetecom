import { Comment } from './comment.entity';

export class CommentCreatedCommand {
  constructor(public readonly comment: Comment) {}
}
