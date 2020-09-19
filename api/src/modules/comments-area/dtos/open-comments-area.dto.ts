import { Expose } from 'class-transformer';

import { OpenCommentsAreaRequestStatus } from '../open-comments-area-request.entity';

export class OpenCommentsAreaRequestDto {

  constructor(partial: Partial<OpenCommentsAreaRequestDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  identifier: string;

  @Expose()
  status: OpenCommentsAreaRequestStatus;

}
