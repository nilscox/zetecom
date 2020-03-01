import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReactionInDto {

  @IsInt()
  readonly informationId: number;

  @IsOptional()
  @IsInt()
  readonly parentId?: number;

  @IsString()
  @MaxLength(40000)
  readonly text: string;

}
