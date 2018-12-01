import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateReactionDto {

  @IsString()
  @IsOptional()
  readonly quote: string;

  @IsString()
  @IsOptional()
  @MaxLength(4000)
  readonly text: string;

}
