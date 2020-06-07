import { Expose, Transform, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';
import { Message } from '../message.entity';
import { QuickReactionType } from '../quick-reaction.entity';

export class QuickReactionCountDto {

  @Expose({ name: 'APPROVE' })
  approve: number;

  @Expose({ name: 'REFUTE' })
  refute: number;

  @Expose({ name: 'SKEPTIC' })
  skeptic: number;

}

export class ReactionOutDto {

  @Expose()
  id: number;

  @Expose()
  get edited(): Date | false {
    const l = this.history.length;

    if (l === 1)
      return false;

    return this.history[0].created;
  }

  @Expose()
  get text(): string {
    return this.message.text;
  }

  @Expose({ name: 'date' })
  created: Date;

  @Expose()
  repliesCount: number;

  @Expose()
  @Type(() => QuickReactionCountDto)
  quickReactionsCount: QuickReactionCountDto;

  @Expose()
  @Transform((value: QuickReactionType) => ({
    APPROVE: 'approve',
    REFUTE: 'refute',
    SKEPTIC: 'skeptic',
    null: null,
  }[value]))
  userQuickReaction: string;

  @Expose()
  subscribed?: boolean;

  @Expose()
  @Type(() => UserLightOutDto)
  author: UserLightOutDto;

  message: Message;
  history: Message[];

}
