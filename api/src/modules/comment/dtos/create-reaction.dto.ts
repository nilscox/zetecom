import { IsEnum, IsOptional } from 'class-validator';

import { ReactionType } from 'src/modules/comment/reaction.entity';

export class CreateReactionDto {

  @IsOptional()
  @IsEnum(ReactionType)
  type: ReactionType | null;

}
