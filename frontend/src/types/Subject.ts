import { User, parseUser } from './User';

export type Subject = {
  id: number;
  subject: string;
  quote: string | null;
  text: string;
  date: Date;
  edited: false | Date;
  author: Partial<User>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSubject = (data: any): Subject => {
  return {
    ...data,
    date: new Date(data.date),
    edited: !data.edited ? false : new Date(data.edited),
    author: parseUser(data.author),
  };
};
