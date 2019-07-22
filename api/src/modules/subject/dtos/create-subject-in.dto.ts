import { IsEnum, IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

export class CreateSubjectInDto {

  @IsInt()
  readonly informationId: number;

  @IsString()
  @MaxLength(4000)
  readonly text: string;

  @IsString()
  @IsOptional()
  readonly quote: string;

}
