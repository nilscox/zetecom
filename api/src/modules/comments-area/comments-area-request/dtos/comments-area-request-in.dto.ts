import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { IsPast } from 'src/common/is-past.validator';

const require_tld = process.env.NODE_ENV === 'production';

export class CommentsAreaRequestInDto {
  @IsString()
  @IsUrl({ require_tld })
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
}
