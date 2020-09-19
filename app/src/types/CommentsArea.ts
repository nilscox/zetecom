import { Comment, parseComment } from './Comment';
import { parseUser, User } from './User';

export type CommentsArea = {
  id: number;
  informationUrl: string;
  informationTitle: string;
  informationAuthor: string;
  imageUrl: string | null;
  published?: Date;
  creator?: Partial<User>;
  commentsCount: number;
  comments?: Comment[];
};

export type OpenCommentsAreaRequest = {
  id: number;
  identifier: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCommentsArea = (data: any): CommentsArea => {
  return {
    ...data,
    published: data.published ? new Date(data.published) : undefined,
    creator: data.creator ? parseUser(data.creator) : undefined,
    comments: Array.isArray(data.comments) ? data.comments.map(parseComment) : undefined,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseOpenCommentsAreaRequest = (data: any): OpenCommentsAreaRequest => {
  return {
    ...data,
  };
};
