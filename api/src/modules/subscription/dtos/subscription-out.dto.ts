import { Expose, Type } from 'class-transformer';

import { ReactionOutDto } from '../../reaction/dtos/reaction-out.dto';
import { Reaction } from '../../reaction/reaction.entity';

export class ReactionSubscriptionOutDto {

  @Expose()
  id: number;

  @Expose()
  created: Date;

  @Expose()
  @Type(() => ReactionOutDto)
  reaction: Reaction;

}
