import { User, parseUser } from "./User";

export enum ReactionLabel {
  SOURCE = "SOURCE",
  METHOD = "MÉTHODE",
  POV = "OPINION"
}

export type ShortRepliesCount = {
  approve: number;
  refute: number;
  skeptic: number;
};

export type Reaction = {
  id: number;
  slug: string;
  label: ReactionLabel;
  quote: string | null;
  text: string;
  date: Date;
  edited: false | Date;
  repliesCount: number;
  author: Partial<User>;
  shortRepliesCount: ShortRepliesCount;
};

export const parseReaction = (data: any): Reaction => {
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: parseUser(data.author)
  };
};
