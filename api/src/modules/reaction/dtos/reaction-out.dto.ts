import { Expose, Transform, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';
import { Message } from '../message.entity';
import { QuickReactionType } from '../quick-reaction.entity';

export class QuickReactionsCountDto {

  @Expose()
  APPROVE: number;

  @Expose()
  REFUTE: number;

  @Expose()
  SKEPTIC: number;

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

  // plainToClass fails without a setter (in OutputInterceptor)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set edited(p) {}

  @Expose()
  get text(): string {
    return this.message.text;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  set text(p) {}

  @Expose({ name: 'date' })
  created: Date;

  @Expose()
  repliesCount: number;

  @Expose()
  @Type(() => QuickReactionsCountDto)
  quickReactionsCount: QuickReactionsCountDto;

  @Expose()
  userQuickReaction: QuickReactionType;

  @Expose()
  subscribed?: boolean;

  @Expose()
  @Type(() => UserLightOutDto)
  author: UserLightOutDto;

  message: Message;
  history: Message[];

}
