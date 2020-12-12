import { Expose } from 'class-transformer';

import { CommentsAreaRequestStatus } from '../comments-area-request.entity';

export class CommentsAreaRequestDto {
  constructor(partial: Partial<CommentsAreaRequestDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  informationUrl: string;

  @Expose()
  informaitonTitle: string;

  @Expose()
  informaitonAuthor: string;

  @Expose()
  informaitonPublicationDate: string;

  @Expose()
  identifier: string;

  @Expose()
  imageUrl: string;

  @Expose()
  status: CommentsAreaRequestStatus;
}
