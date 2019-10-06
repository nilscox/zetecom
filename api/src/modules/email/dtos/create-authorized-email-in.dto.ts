import { IsString, IsEmail } from 'class-validator';

export class CreateAuthorizedEmailInDto {

  @IsString()
  @IsEmail()
  email: string;

}
