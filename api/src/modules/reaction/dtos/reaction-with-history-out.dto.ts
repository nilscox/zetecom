import { Expose, Type } from 'class-transformer';

import { ReactionOutDto } from './reaction-out.dto';

export class ReactionEditionOutDto {

  @Expose()
  text: string;

  @Expose({ name: 'date' })
  created: Date;

}

export class ReactionWithHistoryOutDto extends ReactionOutDto {

  @Expose()
  @Type(() => ReactionEditionOutDto)
  get history() {
    return this.messages.slice(0, -1);
  }

}
