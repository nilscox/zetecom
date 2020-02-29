import { IsEnum, IsIn, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSubjectInDto {

  @IsInt()
  readonly informationId: number;

  @IsString()
  @MaxLength(4000)
  readonly text: string;

  @IsString()
  @MaxLength(240)
  readonly subject: string;

  @IsString()
  @IsOptional()
  readonly quote: string;

}
