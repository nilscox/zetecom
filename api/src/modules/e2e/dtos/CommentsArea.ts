import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

import { MediaType } from 'src/modules/comments-area/comments-area-information.entity';

import { CommentDto } from './Comment';

class CommentsAreaInformationDto {
  @IsOptional()
  @IsEnum(MediaType)
  media?: MediaType;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsDateString()
  publicationDate?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;
}

export class CommentsAreaDto {
  @IsOptional()
  @IsString()
  identifier?: string;

  @IsOptional()
  @Type(() => CommentsAreaInformationDto)
  information: CommentsAreaInformationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CommentDto)
  comments?: CommentDto[];
}
