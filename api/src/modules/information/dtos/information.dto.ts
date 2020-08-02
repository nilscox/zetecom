import { Expose } from 'class-transformer';

export class InformationDto {

  constructor(partial: Partial<InformationDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  identifier: string;

  @Expose()
  title: string;

  @Expose()
  url: string;

  @Expose()
  imageUrl: string;

  @Expose()
  published: Date;

  @Expose()
  commentsCount: number;

}
