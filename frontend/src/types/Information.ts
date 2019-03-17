import { User, parseUser } from './User';

export type Information = {
  id: number,
  slug: string,
  title: string,
  url: string,
  image: string | null,
  creator: Partial<User>,
};

export const parseInformation = (data: any): Information => {
  return {
    ...data,
    creator: parseUser(data.creator),
  };
};
