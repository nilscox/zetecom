import { IsEnum, IsOptional } from 'class-validator';

import { ReactionType } from '../reaction.entity';

export class CreateReactionDto {

  @IsOptional()
  @IsEnum(ReactionType)
  type: ReactionType | null;

}
