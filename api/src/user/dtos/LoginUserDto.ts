import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

}
