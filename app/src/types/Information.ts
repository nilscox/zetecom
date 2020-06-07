import { parseReaction, Reaction } from './Reaction';
import { parseUser, User } from './User';

export type Information = {
  id: number;
  title: string;
  url: string;
  imageUrl: string | null;
  published?: Date;
  creator?: Partial<User>;
  reactionsCount: number;
  reactions?: Reaction[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseInformation = (data: any): Information => {
  return {
    ...data,
    published: data.published ? new Date(data.published) : undefined,
    creator: data.creator ? parseUser(data.creator) : undefined,
    reactions: Array.isArray(data.reactions) ? data.reactions.map(parseReaction) : undefined,
  };
};
