import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentsAreaInDto {

  @IsString()
  @IsNotEmpty()
  readonly identifier: string;

  @IsString()
  @IsNotEmpty()
  readonly informationUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly informationTitle: string;

  @IsString()
  @IsNotEmpty()
  readonly informationAuthor?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

  @IsDateString()
  @IsOptional()
  readonly published?: string;

}
