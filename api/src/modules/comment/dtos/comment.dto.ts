import { Expose, Type } from 'class-transformer';

import { UserLight } from '../../user/user.entity';

import { Message } from './../message.entity';
import { ReactionType } from './../reaction.entity';

export class ReactionsCountDto {

  @Expose()
  APPROVE: number;

  @Expose()
  REFUTE: number;

  @Expose()
  SKEPTIC: number;

}

export class CommentHistoryDto {

  constructor(partial: Partial<CommentHistoryDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  text: string;

  @Expose({ name: 'date' })
  created: Date;

}

export class CommentDto {

  constructor(partial: Partial<CommentDto>) {
    Object.assign(this, partial);
  }

  messages: Message[];

  @Expose()
  id: number;

  @Expose({ name: 'date' })
  created: Date;

  @Expose()
  @Type(() => UserLight)
  author: UserLight;

  @Expose()
  get edited(): Date | false {
    const l = this.messages.length;

    if (l === 1)
      return false;

    return this.messages[0].created;
  }

  @Expose()
  get text(): string {
    return this.messages[0].text;
  }

  @Expose()
  repliesCount?: number;

  @Expose()
  @Type(() => ReactionsCountDto)
  reactionsCount?: { [key in ReactionType]: number };

  @Expose()
  userReaction?: ReactionType;

  @Expose()
  subscribed?: boolean;

}
