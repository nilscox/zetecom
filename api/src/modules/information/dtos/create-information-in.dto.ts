import { IsString, IsUrl } from 'class-validator';

export class CreateInformationInDto {

  @IsString()
  @IsUrl()
  readonly url: string;

  @IsString()
  readonly title: string;

}