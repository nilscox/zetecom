import { IsEmail, IsOptional, IsString } from 'class-validator';

export class User {

  @IsString()
  nick: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;

}
