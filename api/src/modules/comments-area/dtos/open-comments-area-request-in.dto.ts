import { IsString } from 'class-validator';

export class OpenCommentsAreaRequestInDto {

  @IsString()
  readonly identifier: string;

}
