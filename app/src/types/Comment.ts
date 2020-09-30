import { CommentsArea, parseCommentsArea } from './CommentsArea';
import { parseUser, UserLight } from './User';

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

export type Message = {
  date: Date;
  text: string;
};

export type Comment = {
  id: number;
  quote: string | null;
  text: string;
  date: Date;
  edited: false | Date;
  repliesCount: number;
  author: UserLight;
  reactionsCount?: ReactionsCount;
  userReaction?: ReactionType;
  subscribed?: boolean;
  commentsArea?: CommentsArea;
  score: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseMessage = (data: any): Message => {
  return {
    ...data,
    date: new Date(data.date),
  } as Message;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseComment = (data: any): Comment => {
  // code smell (as any)
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: data.author ? parseUser(data.author) : undefined,
    reactionsCount: data.reactionsCount ? data.reactionsCount : null,
    userReaction: data.userReaction ? data.userReaction : null,
    commentsArea: data.commentsArea ? parseCommentsArea(data.commentsArea) : undefined,
  } as Comment;
};
