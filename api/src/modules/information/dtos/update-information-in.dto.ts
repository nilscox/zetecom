import { IsOptional, IsString } from 'class-validator';

export class UpdateInformationInDto {

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly url: string;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;

}
