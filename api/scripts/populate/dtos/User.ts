import { IsString, IsEmail } from 'class-validator';

export class User {

  @IsString()
  nick: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

}
