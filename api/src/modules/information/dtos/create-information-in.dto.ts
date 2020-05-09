import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateInformationInDto {

  @IsString()
  @IsUrl()
  readonly url: string;

  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;

}
