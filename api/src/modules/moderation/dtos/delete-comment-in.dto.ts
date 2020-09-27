import { IsInt } from 'class-validator';

export class DeleteCommentInDto {

  @IsInt()
  commentId: number;

}
