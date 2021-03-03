import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

import { MediaType } from '../comments-area.entity';

export class UpdateCommentsAreaInDto {
  @IsEnum(MediaType)
  @IsOptional()
  readonly informationMedia: MediaType;

  @IsString()
  @IsOptional()
  readonly informationUrl?: string;

  @IsString()
  @IsOptional()
  readonly informationTitle?: string;

  @IsString()
  @IsOptional()
  readonly informationAuthor?: string;

  @IsDateString()
  @IsOptional()
  readonly informationPublicationDate?: string;
}
