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
  approve?: string[];
  refute?: string[];
  skeptic?: string[];
};

export type Comment = {
  author?: string;
  text?: string;
  reactions?: Reactions;
  history?: string[];
  replies?: Comment[];
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
