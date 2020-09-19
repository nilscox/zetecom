import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateInformationInDto {

  @IsString()
  readonly identifier: string;

  @IsString()
  readonly url: string;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly author?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

  @IsDateString()
  @IsOptional()
  readonly published?: string;

}
