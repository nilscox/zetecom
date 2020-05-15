import { IsOptional, IsString } from 'class-validator';

export class CreateInformationInDto {

  @IsString()
  readonly identifier: string;

  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

}
