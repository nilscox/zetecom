import { User, parseUser } from "./User";

export enum ReactionLabel {
  SOURCE = "SOURCE",
  METHOD = "MÉTHODE",
  POV = "OPINION"
}

export enum ShortReplyType {
  APPROVE = 'approve',
  REFUTE = 'refute',
  SKEPTIC = 'skeptic',
}

export type ShortRepliesCount = {
  approve: number;
  refute: number;
  skeptic: number;
};

export type ReactionHistory = {
  date: Date,
  text: string;
};

export type Reaction = {
  id: number;
  slug: string;
  label: ReactionLabel;
  quote: string | null;
  text: string;
  date: Date;
  edited: false | Date;
  history: ReactionHistory[] | null;
  repliesCount: number;
  author: Partial<User>;
  shortRepliesCount: ShortRepliesCount;
  userShortReply: ShortReplyType;
};

export const parseReactionHistory = (data: any): ReactionHistory => {
  return {
    ...data,
    date: new Date(data.date),
  };
};

export const parseReaction = (data: any): Reaction => {
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: parseUser(data.author),
    history: data.history ? data.history.map(parseReactionHistory) : null,
  };
};
