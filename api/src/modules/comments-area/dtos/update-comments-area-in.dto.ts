import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateCommentsAreaInDto {

  @IsString()
  @IsOptional()
  readonly informationUrl: string;

  @IsString()
  @IsOptional()
  readonly informationTitle: string;

  @IsDateString()
  @IsOptional()
  readonly published?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;

}
