import { IsEnum, IsOptional } from 'class-validator';

import { ReactionType } from '../reaction.entity';

export class ReactionInDto {

  @IsOptional()
  @IsEnum(ReactionType)
  type: ReactionType | null;

}
