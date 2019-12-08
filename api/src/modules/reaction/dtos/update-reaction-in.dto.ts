import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateReactionInDto {

  @IsString()
  @IsOptional()
  @MaxLength(40000)
  readonly text: string;

}
