import { IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  readonly commentsAreaId: number;

  @IsOptional()
  @IsInt()
  readonly parentId?: number;

  @IsString()
  @MaxLength(40000)
  @MinLength(1)
  readonly text: string;
}
