import { Expose } from 'class-transformer';

import { CommentsAreaRequestStatus } from '../comments-area-request.entity';

export class CommentsAreaRequestDto {

  constructor(partial: Partial<CommentsAreaRequestDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  identifier: string;

  @Expose()
  status: CommentsAreaRequestStatus;

}
