import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateInformationInDto {

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly url: string;

  @IsDateString()
  @IsOptional()
  readonly published?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;

}
