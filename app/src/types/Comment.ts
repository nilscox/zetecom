import { Transform, Type } from 'class-transformer';

import { CommentsArea } from './CommentsArea';
import { UserLight } from './User';

export enum ReactionType {
  like = 'like',
  approve = 'approve',
  think = 'think',
  disagree = 'disagree',
  dontUnderstand = 'dontUnderstand',
}

export type ReactionsCount = {
  [ReactionType.like]: number;
  [ReactionType.approve]: number;
  [ReactionType.think]: number;
  [ReactionType.disagree]: number;
  [ReactionType.dontUnderstand]: number;
};

export class Message {
  date: Date;

  text: string;
}

export class Comment {
  id: number;

  // TODO: remove?
  quote: string | null;

  text: string;

  @Type(() => Date)
  date: Date;

  @Transform(({ value }) => typeof value === 'string' && new Date(value))
  edited: false | Date;

  repliesCount: number;

  @Type(() => UserLight)
  author: UserLight;

  // TODO: the api allows this to be undefined: why?
  reactionsCount: ReactionsCount;

  userReaction?: ReactionType | null;

  subscribed?: boolean;

  @Type(() => CommentsArea)
  commentsArea?: CommentsArea;

  score: number;
}
