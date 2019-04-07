import { IsEnum, IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

export class CreateReactionInDto {

  @IsInt()
  readonly informationId: number;

  @IsInt()
  @IsOptional()
  readonly parentId: number;

  @IsString()
  @IsOptional()
  readonly quote: string;

  @IsString()
  @MaxLength(4000)
  readonly text: string;

}
