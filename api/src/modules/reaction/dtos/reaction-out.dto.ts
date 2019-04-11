import { Expose, Exclude, Transform, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';

import { Message } from '../message.entity';
import { QuickReactionType } from '../quick-reaction.entity';

type ReactionLabel =
  | 'SOURCE'
  | 'METHOD';

class QuickReactionCountDto {

  @Expose({ name: 'approve' })
  APPROVE: number;

  @Expose({ name: 'refute' })
  REFUTE: number;

  @Expose({ name: 'skeptic' })
  SKEPTIC: number;

}

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
  @Type(() => QuickReactionCountDto)
  quickReactionsCount: QuickReactionCountDto;

  @Expose()
  @Transform(value => ({
    APPROVE: 'approve',
    REFUTE: 'refute',
    SKEPTIC: 'skeptic',
    null: null,
  }[value]))
  userQuickReaction: string;

  @Expose()
  @Type(() => UserLightOutDto)
  author: UserLightOutDto;

  messages: Message[];

}
