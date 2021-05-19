import { Expose } from 'class-transformer';

import { CommentsAreaStatus } from '../comments-area.entity';

export class CommentsAreaDto {
  constructor(partial: Partial<CommentsAreaDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  status: CommentsAreaStatus;

  @Expose()
  commentsCount: number;
}
