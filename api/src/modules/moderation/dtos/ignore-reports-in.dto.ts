import { IsInt } from 'class-validator';

export class IgnoreReportsInDto {

  @IsInt()
  commentId: number;

}
