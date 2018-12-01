import { IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

import LABELS from 'Utils/labels';

export class CreateReactionDto {

  @IsInt()
  readonly informationId: number;

  @IsInt()
  @IsOptional()
  readonly parentId: number;

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
