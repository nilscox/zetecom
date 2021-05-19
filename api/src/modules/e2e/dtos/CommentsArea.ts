import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { CommentDto } from './Comment';

export class CommentsAreaDto {
  @IsOptional()
  @IsString()
  identifier?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentDto)
  comments?: CommentDto[];
}
