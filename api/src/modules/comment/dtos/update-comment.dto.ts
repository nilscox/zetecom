import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {

  @IsString()
  @IsOptional()
  @MaxLength(40000)
  readonly text: string;

}
