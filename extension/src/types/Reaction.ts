import { Information, parseInformation } from './Information';
import { parseUser, UserLight } from './User';

export enum QuickReactionType {
  APPROVE = 'approve',
  REFUTE = 'refute',
  SKEPTIC = 'skeptic',
}

export type QuickReactionsCount = {
  approve: number;
  refute: number;
  skeptic: number;
};

export type ReactionHistory = {
  date: Date;
  text: string;
};

export type Reaction = {
  id: number;
  quote: string | null;
  text: string;
  date: Date;
  edited: false | Date;
  history: ReactionHistory[] | null;
  repliesCount: number;
  author: UserLight;
  quickReactionsCount?: QuickReactionsCount;
  userQuickReaction?: QuickReactionType;
  bookmarked?: boolean;
  subscribed?: boolean;
  information?: Information;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReactionHistory = (data: any): ReactionHistory => {
  return {
    ...data,
    date: new Date(data.date),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReaction = (data: any): Reaction => {
  // code smell (as any)
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: parseUser(data.author),
    history: data.history ? data.history.map(parseReactionHistory) : null,
    quickReactionsCount: data.quickReactionsCount
      ? Object.keys(data.quickReactionsCount).reduce((obj, key) => {
        obj[key] = data.quickReactionsCount[key];
        return obj;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, {} as any)
      : null,
    userQuickReaction: data.userQuickReaction ? data.userQuickReaction : null,
    information: data.information ? parseInformation(data.information) : undefined,
  };
};
