import { Expose, Exclude, Transform, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';
import { Message } from '../../reaction/message.entity';
import { ReactionOutDto, QuickReactionCountDto } from '../../reaction/dtos/reaction-out.dto';

export class SubjectOutDto {

  @Expose()
  id: number;

  @Expose()
  subject: string;

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
  reactionsCount: number;

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
