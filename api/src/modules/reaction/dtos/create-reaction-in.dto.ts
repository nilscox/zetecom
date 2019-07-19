import { IsEnum, IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

export class CreateReactionInDto {

  @IsInt()
  readonly informationId: number;

  @IsString()
  @MaxLength(4000)
  readonly text: string;

}

export class CreateMainReactionInDto extends CreateReactionInDto {

  @IsString()
  @IsOptional()
  readonly quote: string;

}
