import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

import { CommentDto } from './Comment';

export class InformationDto {

  @IsString()
  title: string;

  @IsString()
  identifier: string;

  @IsString()
  @IsUrl()
  url: string;

  @IsString()
  creator: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentDto)
  comments?: CommentDto[];

}
