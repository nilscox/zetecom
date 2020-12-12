import { IsOptional, IsString } from 'class-validator';

export class CommentsAreaRequestInDto {
  @IsString()
  readonly informationUrl: string;

  @IsString()
  @IsOptional()
  readonly informaitonTitle: string;

  @IsString()
  @IsOptional()
  readonly informaitonAuthor: string;

  @IsString()
  @IsOptional()
  readonly informaitonPublicationDate: string;

  @IsString()
  @IsOptional()
  readonly identifier: string;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;
}
