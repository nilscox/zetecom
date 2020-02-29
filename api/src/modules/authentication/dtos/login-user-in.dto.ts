import { IsEmail, IsString } from 'class-validator';

export class LoginUserInDto {

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

}
