import { Expose } from 'class-transformer';

export class CommentsAreaDto {

  constructor(partial: Partial<CommentsAreaDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  identifier: string;

  @Expose()
  informationUrl: string;

  @Expose()
  informationTitle: string;

  @Expose()
  informationAuthor: string;

  @Expose()
  imageUrl: string;

  @Expose()
  published: Date;

  @Expose()
  commentsCount: number;

}
