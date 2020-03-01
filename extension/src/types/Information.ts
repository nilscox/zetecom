import { parseUser, User } from './User';

export type Information = {
  id: number;
  title: string;
  url: string;
  imageUrl: string | null;
  creator?: Partial<User>;
  reactionsCount: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseInformation = (data: any): Information => {
  return {
    ...data,
    creator: data.creator ? parseUser(data.creator) : undefined,
  };
};
