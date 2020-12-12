import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentsAreaInDto {
  @IsString()
  @IsNotEmpty()
  readonly informationUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly informationTitle: string;

  @IsString()
  @IsNotEmpty()
  readonly informationAuthor: string;

  @IsDateString()
  @IsOptional()
  readonly informationPublicationDate?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;
}
