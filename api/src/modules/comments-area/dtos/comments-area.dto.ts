import { Expose } from 'class-transformer';

export class CommentsAreaDto {
  constructor(partial: Partial<CommentsAreaDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  informationUrl: string;

  @Expose()
  informationTitle: string;

  @Expose()
  informationAuthor: string;

  @Expose()
  informationPublicationDate: Date;

  @Expose()
  imageUrl: string;

  @Expose()
  commentsCount: number;
}
