import { Information, parseInformation } from './Information';
import { parseUser, UserLight } from './User';

export enum ReactionType {
  APPROVE = 'APPROVE',
  REFUTE = 'REFUTE',
  SKEPTIC = 'SKEPTIC',
}

export type ReactionsCount = {
  APPROVE: number;
  REFUTE: number;
  SKEPTIC: number;
};

export type CommentHistory = {
  date: Date;
  text: string;
};

export type Comment = {
  id: number;
  quote: string | null;
  text: string;
  date: Date;
  edited: false | Date;
  history: CommentHistory[] | null;
  repliesCount: number;
  author: UserLight;
  reactionsCount?: ReactionsCount;
  userReaction?: ReactionType;
  subscribed?: boolean;
  information?: Information;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCommentHistory = (data: any): CommentHistory => {
  return {
    ...data,
    date: new Date(data.date),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseComment = (data: any): Comment => {
  // code smell (as any)
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: data.author ? parseUser(data.author) : undefined,
    history: data.history ? data.history.map(parseCommentHistory) : null,
    reactionsCount: data.reactionsCount
      ? Object.keys(data.reactionsCount).reduce((obj, key) => {
        obj[key] = data.reactionsCount[key];
        return obj;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as any)
      : null,
    userReaction: data.userreaction ? data.userreaction : null,
    information: data.information ? parseInformation(data.information) : undefined,
  };
};
