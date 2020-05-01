import { Expose, Type } from 'class-transformer';

import { Message } from '../message.entity';

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
  history: Message[];

}
