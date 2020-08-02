import { IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {

  @IsString()
  @MaxLength(40000)
  readonly text: string;

}
