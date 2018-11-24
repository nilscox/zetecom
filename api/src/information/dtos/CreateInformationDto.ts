import { IsString, IsUrl } from 'class-validator';

export class CreateInformationDto {

  @IsString()
  @IsUrl()
  readonly url: string;

  @IsString()
  readonly title: string;

}