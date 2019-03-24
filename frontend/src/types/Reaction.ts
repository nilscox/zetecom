import { User, parseUser } from './User';

export type ReactionLabel = 'SOURCE' | 'METHOD';

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
  approveCount: number;
  refuteCount: number;
  likeCount: number;
};

export const parseReaction = (data: any): Reaction => {
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: parseUser(data.author),
  };
};
