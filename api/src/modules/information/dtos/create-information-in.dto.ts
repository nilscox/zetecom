import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateInformationInDto {

  @IsString()
  readonly identifier: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly url?: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

  @IsDateString()
  @IsOptional()
  readonly published?: string;

}
