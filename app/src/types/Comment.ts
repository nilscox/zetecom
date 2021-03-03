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

export type Message = {
  date: string;
  text: string;
};

export type Comment = {
  id: number;
  text: string;
  date: string;
  edited: false | string;
  repliesCount: number;
  author: UserLight;
  reactionsCount: ReactionsCount;
  userReaction?: ReactionType | null;
  subscribed?: boolean;
  score: number;
};
