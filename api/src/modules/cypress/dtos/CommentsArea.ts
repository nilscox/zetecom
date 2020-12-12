import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

import { CommentDto } from './Comment';

export class CommentsAreaDto {
  @IsString()
  identifier: string;

  @IsOptional()
  @IsString()
  creator?: string;

  @IsOptional()
  @IsString()
  informationTitle?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  informationUrl?: string;

  @IsOptional()
  @IsString()
  informationAuthor?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentDto)
  comments?: CommentDto[];
}
