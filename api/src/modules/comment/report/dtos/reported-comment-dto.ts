import { Expose, Type } from 'class-transformer';

import { CommentDto } from '../../dtos/comment.dto';

import { ReportDto } from './report';

export class ReportedCommentDto extends CommentDto {

  constructor(partial: Partial<ReportedCommentDto>) {
    super(partial);
  }

  @Expose()
  @Type(() => ReportDto)
  reports: ReportDto[];

}
