import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {

  @IsInt()
  readonly commentsAreaId: number;

  @IsOptional()
  @IsInt()
  readonly parentId?: number;

  @IsString()
  @MaxLength(40000)
  readonly text: string;

}
