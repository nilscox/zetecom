import { Transform, Type } from 'class-transformer';

import { CommentsArea } from './CommentsArea';
import { UserLight } from './User';

export enum ReactionType {
  APPROVE = 'approve',
  REFUTE = 'refute',
  SKEPTIC = 'skeptic',
}

export type ReactionsCount = {
  [ReactionType.APPROVE]: number;
  [ReactionType.REFUTE]: number;
  [ReactionType.SKEPTIC]: number;
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
