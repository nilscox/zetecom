import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

import { MediaType } from '../comments-area-information.entity';

export class UpsertCommentsAreaInformationInDto {
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
