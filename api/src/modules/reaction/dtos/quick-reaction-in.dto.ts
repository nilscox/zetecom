import { IsEnum, IsOptional } from 'class-validator';

import { QuickReactionType } from '../quick-reaction.entity';

export class QuickReactionInDto {

  @IsOptional()
  @IsEnum(QuickReactionType)
  type: QuickReactionType | null;

}
