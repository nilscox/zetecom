import { IsDateString, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { IsPast } from 'Common/is-past.validator';

export class CreateCommentsAreaInDto {
  @IsString()
  @IsOptional()
  readonly integrationIdentifier?: string;

  @IsString()
  @IsUrl()
  @MinLength(5)
  @MaxLength(1000)
  readonly informationUrl: string;

  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  readonly informationTitle: string;

  @IsString()
  @MinLength(5)
  @MaxLength(32)
  readonly informationAuthor: string;

  @IsOptional()
  @IsDateString()
  @IsPast()
  readonly informationPublicationDate?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MinLength(10)
  @MaxLength(1000)
  readonly imageUrl?: string;
}
