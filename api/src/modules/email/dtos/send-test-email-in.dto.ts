import { IsString } from 'class-validator';

export class SendTestEmailInDto {

  @IsString()
  subject: string;

  @IsString()
  value: string;

}
