import { User, parseUser } from './User';

export type Information = {
  id: number;
  title: string;
  url: string;
  image: string | null;
  creator?: Partial<User>;
  reactionsCount: number;
  subjectsCount: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseInformation = (data: any): Information => {
  return {
    ...data,
    creator: data.creator ? parseUser(data.creator) : undefined,
  };
};
