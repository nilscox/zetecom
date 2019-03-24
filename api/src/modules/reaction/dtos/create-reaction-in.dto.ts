import { IsEnum, IsOptional, IsString, IsInt, IsIn, MaxLength } from 'class-validator';

import { ReactionLabel } from '../reaction.entity';

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
  @IsEnum(ReactionLabel)
  readonly label: ReactionLabel;

  @IsString()
  @MaxLength(4000)
  readonly text: string;

}
