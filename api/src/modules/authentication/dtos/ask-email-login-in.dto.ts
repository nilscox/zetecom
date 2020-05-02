import { IsEmail, IsString } from 'class-validator';

export class AskEmailLoginInDto {

  @IsString()
  @IsEmail()
  readonly email: string;

}
