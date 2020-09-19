import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

import { CommentDto } from './Comment';

export class CommentsAreaDto {

  @IsString()
  identifier: string;

  @IsString()
  informationTitle: string;

  @IsString()
  @IsUrl()
  informationUrl: string;

  @IsString()
  informationAuthor: string;

  @IsString()
  creator: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentDto)
  comments?: CommentDto[];

}
