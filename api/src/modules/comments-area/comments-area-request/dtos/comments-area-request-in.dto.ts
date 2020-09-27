import { IsString } from 'class-validator';

export class CommentsAreaRequestInDto {

  @IsString()
  readonly identifier: string;

}
