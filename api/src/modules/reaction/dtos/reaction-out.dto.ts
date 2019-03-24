import { Expose, Exclude, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';

import { Message } from '../message.entity';

import LABELS from 'Utils/labels';

type ReactionLabel =
  | 'SOURCE'
  | 'METHOD';

export class ReactionOutDto {

  @Expose()
  id: number;

  @Expose()
  slug: string;

  @Expose()
  label: ReactionLabel;

  @Expose()
  quote: string | null;

  @Expose()
  get edited(): Date | false {
    const l = this.messages.length;

    if (l === 1)
      return false;

    return this.messages[l - 1].created;
  }

  @Expose()
  get text(): string {
    const l = this.messages.length;

    return this.messages[l - 1].text;
  }

  @Expose({ name: 'date' })
  created: Date;

  @Expose()
  repliesCount: number;

  @Expose()
  @Type(() => UserLightOutDto)
  author: UserLightOutDto;

  messages: Message[];

}
