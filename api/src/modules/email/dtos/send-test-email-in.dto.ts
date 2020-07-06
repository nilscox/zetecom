import { IsEmail, IsString } from 'class-validator';

export class SendTestEmailInDto {

  @IsString()
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  value: string;

}
