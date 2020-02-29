import { IsEmail, IsString } from 'class-validator';

export class CreateAuthorizedEmailInDto {

  @IsString()
  @IsEmail()
  email: string;

}
