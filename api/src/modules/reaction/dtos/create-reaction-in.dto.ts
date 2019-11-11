import { IsEnum, IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

export class CreateReactionInDto {

  @IsInt()
  @IsOptional()
  readonly subjectId?: number;

  @IsOptional()
  @IsInt()
  readonly parentId: number;

  @IsString()
  @MaxLength(4000)
  readonly text: string;

}
