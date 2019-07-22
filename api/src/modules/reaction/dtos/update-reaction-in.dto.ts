import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateReactionInDto {

  @IsString()
  @IsOptional()
  @MaxLength(4000)
  readonly text: string;

}
