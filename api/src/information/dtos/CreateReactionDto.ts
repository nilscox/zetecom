import { IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

import LABELS from 'Utils/labels';

export class CreateReactionDto {

  @IsString()
  @IsOptional()
  readonly quote: string;

  @IsString()
  @IsIn(LABELS)
  readonly label: string;

  @IsString()
  @MaxLength(4000)
  readonly text: string;

}
