import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateCommentsAreaInDto {
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

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;
}
