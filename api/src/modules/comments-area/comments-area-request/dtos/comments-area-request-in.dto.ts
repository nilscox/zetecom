import { IsOptional, IsString } from 'class-validator';

export class CommentsAreaRequestInDto {
  @IsString()
  readonly informationUrl: string;

  @IsString()
  @IsOptional()
  readonly informationTitle: string;

  @IsString()
  @IsOptional()
  readonly informationAuthor: string;

  @IsString()
  @IsOptional()
  readonly informationPublicationDate: string;

  @IsString()
  @IsOptional()
  readonly identifier: string;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;
}
