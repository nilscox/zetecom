import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import { Role } from '../../authorization/roles.enum';

export class UserDto {
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

  @IsEnum(Role, { each: true })
  @IsOptional()
  roles?: Role[];
}
