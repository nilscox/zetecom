import { IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordInDto {

  @IsString()
  @MinLength(6)
  @MaxLength(64)
  readonly password: string;

}
