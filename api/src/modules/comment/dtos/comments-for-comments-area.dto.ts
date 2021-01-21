import { Expose, Type } from 'class-transformer';

import { CommentsAreaDto } from 'src/modules/comments-area/dtos/comments-area.dto';

import { CommentDto } from './comment.dto';

export class CommentsForCommentsAreaDto {

  constructor(partial: Partial<CommentsForCommentsAreaDto>) {
    Object.assign(this, partial);
    this.commentsArea = new CommentsAreaDto(partial.commentsArea);
    this.comments = partial.comments.map(comment => new CommentDto(comment));
  }

  @Expose()
  @Type(() => CommentsAreaDto)
  commentsArea: CommentsAreaDto;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];

}
