import { Expose, Type } from 'class-transformer';

import { InformationDto } from '../../information/dtos/information.dto';

import { CommentDto } from './comment.dto';

export class CommentsForInformationDto {

  constructor(partial: Partial<CommentsForInformationDto>) {
    Object.assign(this, partial);
    this.information = new InformationDto(partial.information);
    this.comments = partial.comments.map(comment => new CommentDto(comment));
  }

  @Expose()
  @Type(() => InformationDto)
  information: InformationDto;

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];

}
