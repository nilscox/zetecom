import { Expose } from 'class-transformer';

import { MediaType } from '../comments-area.entity';

class CommentsAreaInformationDto {
  constructor(partial: Partial<CommentsAreaInformationDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  media: MediaType;

  @Expose()
  title: string;

  @Expose()
  url: string;

  @Expose()
  author: string;

  @Expose()
  publicationDate: string;
}

export class CommentsAreaDto {
  constructor(partial: Partial<CommentsAreaDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  get information(): CommentsAreaInformationDto {
    return new CommentsAreaInformationDto({
      media: this.informationMedia,
      title: this.informationTitle,
      url: this.informationUrl,
      author: this.informationAuthor,
      publicationDate: this.informationPublicationDate,
    });
  }

  @Expose()
  imageUrl: string;

  @Expose()
  commentsCount: number;

  informationMedia: MediaType;
  informationTitle: string;
  informationUrl: string;
  informationAuthor: string;
  informationPublicationDate: string;
}
