import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

import { IsPast } from 'src/common/is-past.validator';

const require_tld = process.env.NODE_ENV === 'production';

export class CreateCommentsAreaInDto {
  @IsString()
  @IsOptional()
  readonly integrationIdentifier?: string;

  @IsString()
  @IsUrl({ require_tld })
  @MinLength(5)
  @MaxLength(1000)
  readonly informationUrl: string;

  @IsString()
  @MinLength(5)
  @MaxLength(1000)
  readonly informationTitle: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  readonly informationAuthor: string;

  @IsOptional()
  @IsDateString()
  @IsPast()
  readonly informationPublicationDate?: string;

  @IsOptional()
  @IsString()
  @IsUrl({ require_tld })
  @MinLength(10)
  @MaxLength(1000)
  readonly imageUrl?: string;
}
