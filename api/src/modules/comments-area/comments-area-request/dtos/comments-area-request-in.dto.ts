import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { IsPast } from 'Common/is-past.validator';

export class CommentsAreaRequestInDto {
  @IsString()
  @IsUrl()
  @MinLength(5)
  @MaxLength(1000)
  readonly informationUrl: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  readonly informationTitle?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  readonly informationAuthor?: string;

  @IsOptional()
  @IsDateString()
  @IsPast()
  readonly informationPublicationDate?: string;

  @IsOptional()
  @IsString()
  readonly identifier?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MinLength(10)
  @MaxLength(1000)
  readonly imageUrl?: string;
}
