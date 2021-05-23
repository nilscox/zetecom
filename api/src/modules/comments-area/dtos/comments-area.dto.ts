import { Expose } from 'class-transformer';

import { CommentsAreaStatus } from '../comments-area.entity';
import { MediaType } from '../comments-area-information.entity';

class CommentsAreaInformationDto {
  constructor(partial: Partial<CommentsAreaInformationDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  media: MediaType;

  @Expose()
  url: string;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  publicationDate: Date;
}

export class CommentsAreaDto {
  constructor(partial: Partial<CommentsAreaDto>) {
    Object.assign(this, partial);

    this.information = new CommentsAreaInformationDto(this.information);
  }

  @Expose()
  id: number;

  @Expose()
  status: CommentsAreaStatus;

  @Expose()
  commentsCount: number;

  @Expose()
  information: CommentsAreaInformationDto;
}
