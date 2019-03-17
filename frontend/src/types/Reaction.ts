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
  answersCount: number;
  author: Partial<User>;
};

export const parseReaction = (data: any): Reaction => {
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: parseUser(data.author),
  };
};
