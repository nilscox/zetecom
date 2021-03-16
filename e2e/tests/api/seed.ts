import { api } from './api';

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export type User = {
  nick: string;
  email: string;
  password: string;
  avatar?: string;
  roles?: Role[];
};

export type Reactions = {
  like?: string[];
  approve?: string[];
  think?: string[];
  disagree?: string[];
  dontUnderstand?: string[];
};

export type Edition = {
  text: string;
  date: string;
};

export type Comment = {
  author?: string;
  text?: string;
  reactions?: Reactions;
  history?: Edition[];
  replies?: Comment[];
  created?: string;
};

export type CommentsArea = {
  identifier?: string;
  creator?: string;
  informationTitle?: string;
  informationUrl?: string;
  informationAuthor?: string;
  comments?: Comment[];
};

export type Dataset = {
  commentsAreas?: CommentsArea[];
  users?: User[];
};

export const seed = (data?: Dataset) => {
  return api('/api/e2e/seed', {
    method: 'POST',
    body: data,
  });
};
