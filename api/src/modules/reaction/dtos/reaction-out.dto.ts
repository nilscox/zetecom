import { Expose, Exclude, Transform, Type } from 'class-transformer';

import { UserLightOutDto } from '../../user/dtos/user-light-out.dto';

import { Message } from '../message.entity';
import { ShortReplyType } from '../short-reply.entity';

import LABELS from 'Utils/labels';

type ReactionLabel =
  | 'SOURCE'
  | 'METHOD';

class ShortReplyCountDto {

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
  @Type(() => ShortReplyCountDto)
  shortRepliesCount: ShortReplyCountDto;

  @Expose()
  @Transform(value => ({
    APPROVE: 'approve',
    REFUTE: 'refute',
    SKEPTIC: 'skeptic',
  }[value]))
  userShortReply: string;

  @Expose()
  @Type(() => UserLightOutDto)
  author: UserLightOutDto;

  messages: Message[];

}
