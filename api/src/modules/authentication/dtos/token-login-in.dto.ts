import { IsString } from 'class-validator';

export class TokenLoginInDto {
  @IsString()
  token: string;
}
