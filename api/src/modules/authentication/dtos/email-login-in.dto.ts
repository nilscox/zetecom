import { IsString } from 'class-validator';

export class EmailLoginInDto {

  @IsString()
  readonly token: string;

}
