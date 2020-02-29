import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateInformationInDto {

  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly imageUrl: string;

}
